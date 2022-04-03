import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getAllCategories } from './helper/adminapicall';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        return (
            getAllCategories().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setCategories(data);
                }
            }).catch((err) => console.log(err))
        );
    };

    const goBack = () => {
        return (
            <div className="mt-4 ms-3">
                <Link className='btn btn-md btn-success' to='/admin/dashboard'>{`< Admin Dashboard`}</Link>
            </div>
        );
    };

    const deleteThisCategory = (categoryId) => {
        deleteCategory(user._id, token, categoryId).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        }).catch((err) => { console.log(err); });
    };

    useEffect(() => {
        preload();
    }, []);

    return (
        <Base title='Manage Categories' description='Manage Different Product Categories' className='container bg-success p-4'>
            <div className="row bg-dark rounded">
                <div className="col-12 text-white">
                    {goBack()}
                    <h2 className="my-5 text-center">All Categories List: Total {categories.length} Categories</h2>
                    <div className="tabel-responsive">
                        <table className="table table-secondary table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Category</th>
                                    <th scope="col">Update Category</th>
                                    <th scope="col">Delete Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => {
                                    return (
                                        <tr key={index} className=''>
                                            <th scope="row">{index + 1}</th>

                                            <td>{category.name}</td>
                                            <td>
                                                <span className='m-2'>
                                                    <Link to={`/admin/categories/update/${category._id}`}>
                                                        <button className="btn btn-success">Update</button>
                                                    </Link>
                                                </span>
                                            </td>
                                            <td>
                                                <span className='m-2'>
                                                    <button onClick={() => {
                                                        deleteThisCategory(category._id);
                                                    }} className="btn btn-danger">Delete</button>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default ManageCategories;
