import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';


const UpdateCategory = () => {

    const { user, token } = isAuthenticated();

    const { categoryId } = useParams();

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        loading: false,
        error: '',
        createdCategory: '',
        getRedirect: false,
    });

    const { name, loading, error, createdCategory, getRedirect } = values;

    const preload = (categoryId) => {
        return (
            getCategory(categoryId).then((data) => {
                console.log(data);
                if (data.error) {
                    setValues({ error: data.error });
                } else {
                    setValues({ name: data.name });
                }
            }).catch((err) => { console.log(err); })
        );
    };

    useEffect(() => {
        preload(categoryId);
    }, []);

    const handleChange = event => {
        const value = event.target.value;
        setValues({ ...values, name: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: '', loading: true });

        updateCategory(user._id, token, { name }, categoryId).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    loading: false,
                    createdCategory: data.name,
                    getRedirect: true
                });
            }
        }).catch((err) => { console.log(err); });
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-5" style={{ display: (createdCategory) ? '' : 'none' }}>
                <h4>{createdCategory} Category Updated Successfully!</h4>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-5" style={{ display: (error) ? '' : 'none' }}>
                <h4>Category Updation Failed With Error: {error}</h4>
            </div>
        );
    };

    const goBack = () => {
        return (
            <div className="mt-4 mb-5 d-flex justify-content-between">
                <div>
                    <Link className='btn btn-md btn-success' to='/admin/categories'>{`< Manage Products`}</Link>
                </div>
                <div>
                    <Link className='btn btn-md btn-success' to='/admin/dashboard'>{`Admin Dashboard >`}</Link>
                </div>
            </div>
        );
    };

    const updateCategoryForm = () => {
        return (
            <form>
                <div className="form-group mb-3">
                    <label className="form-label">Category Name:</label>
                    <input
                        required
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Category Name"
                        value={name}
                    />
                </div>
                <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3">Update Category</button>
            </form>
        );
    };

    // TODO: Perform Navigate execution after suucess message with delay

    return (
        <Base title='Update Category' description='Update Category Information' className='container bg-success p-4'>
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2 text-white pb-5">
                    {goBack()}
                    {updateCategoryForm()}
                    {successMessage()}
                    {errorMessage()}
                    {/* {performRedirect()} */}
                </div>
            </div>
        </Base>
    );

};

export default UpdateCategory;