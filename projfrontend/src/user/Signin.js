import React, { useState } from 'react';
import Base from '../core/Base';
import { Navigate } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper/index';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;

    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({ ...values, didRedirect: true });
                });
            }
        }).catch((err) => {
            console.log(`Sign In Failed With Error: ${err}`);
        });
    };

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Navigate to='/admin/dashboard' replace={true} />;
            } else {
                return <Navigate to='/user/dashboard' replace={true} />;
            }
        }

        if (isAuthenticated()) {
            return <Navigate replace={true} to='/' />;
        }
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="mb-3 form-group">
                            <label className="form-label text-light">Email Address</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange('email')} />
                        </div>
                        <div className="mb-3 form-group">
                            <label className="form-label text-light">Password</label>
                            <input type="password" className="form-control" value={password} onChange={handleChange('password')} />
                        </div>
                        <div className="d-grid mt-5">
                            <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const loadingMessage = () => {
        return (
            loading && (
                <h3 className="alert alert-info">Loading...</h3>
            )
        );
    };

    const errorMessage = () => {
        return (
            <div className="alert alert-danger container text-center"
                style={{ display: error ? '' : 'none' }}
            >{error}
            </div>
        );
    };

    return (
        <Base title='Sign In' description='Page for Signing In of User'>
            {loadingMessage()}
            {signInForm()}
            {errorMessage()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signin;