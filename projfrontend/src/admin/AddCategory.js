import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => {
        return (
            <div className="mt-4 mb-5">
                <Link className='btn btn-md btn-success' to='/admin/dashboard'>{`< Admin Dashboard`}</Link>
            </div>
        );
    };

    const handleChange = (event) => {
        setError('');
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        // BackEnd Request Fired
        createCategory(user._id, token, { name }).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
                setName('');
            }
        }).catch((err) => { console.log(err); });
    };

    const successMessage = () => {
        if (success) {
            return <h4 className="alert alert-success">Category Created Successfully!</h4>;
        }
    };

    const errorMessage = () => {
        if (error) {
            return (
                <h4 class="alert alert-danger" role="alert">Failed To Create Category!</h4>
            );
        }
    };


    const categoryForm = () => {
        return (
            <form>
                <div className="form-group mb-3">
                    <label className="form-label">Enter Category:</label>
                    <input type="text" className='form-control' autoFocus required onChange={handleChange} value={name} />
                    <button className="btn btn-outline-success mt-4 mb-3" onClick={onSubmit}>Create Category</button>
                </div>
            </form>
        );
    };

    return (
        <Base title='Create A Category' description='Add a New Category For Products' className='container bg-success p-4'>
            <div className="row bg-dark rounded text-white">
                <div className="col-md-8 offset-md-2">
                    {goBack()}
                    {categoryForm()}
                    {successMessage()}
                    {errorMessage()}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;
