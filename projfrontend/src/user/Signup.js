import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';

const Signup = () => {

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { firstname, lastname, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ firstname, lastname, email, password }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, firstname: '', lastname: '', email: '', password: '', error: '', success: true });
            }
        }).catch((err) => { console.log(`Error in Sign Up ${err}`); });
    };

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="mb-3 form-group">
                            <label className="form-label text-light">First Name</label>
                            <input type="text" className="form-control" onChange={handleChange('firstname')} value={firstname} />
                        </div>
                        <div className="mb-3 form-group">
                            <label className="form-label text-light">Last Name</label>
                            <input type="text" className="form-control" onChange={handleChange('lastname')} value={lastname} />
                        </div>
                        <div className="mb-3 form-group">
                            <label className="form-label text-light">Email Address</label>
                            <input type="email" className="form-control" onChange={handleChange('email')} value={email} />
                        </div>
                        <div className="mb-3 form-group">
                            <label className="form-label text-light">Password</label>
                            <input type="password" className="form-control" onChange={handleChange('password')} value={password} />
                        </div>
                        <div className="d-grid mt-5">
                            <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success container text-center"
                style={{ display: success ? '' : 'none' }}
            >New Account was Created Successfully. Please <Link to='/signin'>Sign In</Link>
            </div>
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
        <Base title='Sign Up' description='Page for Registration of New User'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signup;
