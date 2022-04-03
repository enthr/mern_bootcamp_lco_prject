import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getAllCategories } from './helper/adminapicall';


function AddProduct() {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categories: [],
        category: '',
        loading: false,
        error: '',
        createdProduct: '',
        getRedirect: false,
        formData: ''
    });

    const { name, description, price, stock, categories, category, loading, error, createdProduct, getRedirect, formData } = values;

    const preload = () => {
        return (
            getAllCategories().then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, categories: data, formData: new FormData() });
                }
            }).catch((err) => { console.log(err); })
        );
    };

    useEffect(() => {
        preload();
    }, []);

    const handleChange = name => event => {
        const value = (name === 'photo') ? (event.target.files[0]) : (event.target.value);
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    photo: '',
                    stock: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        }).catch((err) => { console.log(err); });
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-5" style={{ display: (createdProduct) ? '' : 'none' }}>
                <h4>{createdProduct} Created Successfully!</h4>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-5" style={{ display: (error) ? '' : 'none' }}>
                <h4>Product Creation Failed With Error: {error}</h4>
            </div>
        );
    };

    const goBack = () => {
        return (
            <div className="mt-4 mb-5">
                <Link className='btn btn-md btn-success' to='/admin/dashboard'>{`< Admin Dashboard`}</Link>
            </div>
        );
    };

    const createProductForm = () => {
        return (
            <form>
                <div className="form-group mb-3">
                    <label className="form-label">Add Photo:</label>
                    <input
                        onChange={handleChange('photo')}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="Choose A File"
                        className='form-control'
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Product Name:</label>
                    <input
                        onChange={handleChange('name')}
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Product Description:</label>
                    <textarea
                        onChange={handleChange('description')}
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Product Price:</label>
                    <input
                        onChange={handleChange('price')}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Select Product Category:</label>
                    <select onChange={handleChange('category')} className="form-control" placeholder="Category">
                        <option>Select...</option>
                        {categories && categories.map((cate, index) => {
                            return <option key={index} value={cate._id}>{cate.name}</option>;
                        })}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Product Stock:</label>
                    <input
                        onChange={handleChange('stock')}
                        type="number"
                        className="form-control my-1"
                        placeholder="Stock"
                        value={stock}
                    />
                </div>
                <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3">Create Product</button>
            </form>
        );
    };

    return (
        <Base title='Add Product' description='Add a New Product to iShop' className='container bg-success p-4'>
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2 text-white pb-5">
                    {goBack()}
                    {createProductForm()}
                    {successMessage()}
                    {errorMessage()}
                </div>
            </div>
        </Base>
    );
}

export default AddProduct;
