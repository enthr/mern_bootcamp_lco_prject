import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getAllProducts } from './helper/adminapicall';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        return (
            getAllProducts().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setProducts(data);
                }
            }).catch()
        );
    };

    const goBack = () => {
        return (
            <div className="mt-4 ms-3">
                <Link className='btn btn-md btn-success' to='/admin/dashboard'>{`< Admin Dashboard`}</Link>
            </div>
        );
    };

    const deleteThisProduct = (productId) => {
        deleteProduct(user._id, token, productId).then((data) => {
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
        <Base title='Manage Products' description='Maintain Products and Related Information' className='container bg-success p-4'>
            <div className="row bg-dark rounded">
                <div className="col-12 text-white">
                    {goBack()}
                    <h2 className="my-5 text-center">All Products List: Total {products.length} Products</h2>
                    <div className="tabel-responsive">
                        <table className="table table-secondary table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product Category</th>
                                    <th scope="col">Update Product</th>
                                    <th scope="col">Delete Product</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => {
                                    return (
                                        <tr key={index} className=''>
                                            <th scope="row">{index + 1}</th>
                                            <td>{product.name}</td>
                                            <td>{product.category.name}</td>
                                            <td>
                                                <span className='m-2'>
                                                    <Link to={`/admin/products/update/${product._id}`}>
                                                        <button className="btn btn-success">Update</button>
                                                    </Link>
                                                </span>
                                            </td>
                                            <td>
                                                <span className='m-2'>
                                                    <button onClick={() => {
                                                        deleteThisProduct(product._id);
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
        </Base >
    );
};

export default ManageProducts;
