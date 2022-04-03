import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getProduct, updateProduct, getAllCategories } from './helper/adminapicall';


const UpdateProduct = () => {

    const { user, token } = isAuthenticated();

    const { productId } = useParams();

    const navigate = useNavigate();

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

    const preloadCategories = () => {
        return (
            getAllCategories().then((data) => {
                if (data.error) {
                    setValues((prevState) => {
                        return { ...prevState, error: data.error };
                    });
                } else {
                    setValues((prevState) => {
                        return { ...prevState, categories: data, formData: new FormData() };
                    });
                }
            }).catch((err) => { console.log(err); })
        );
    };

    const preload = (productId) => {
        return (
            getProduct(productId).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    preloadCategories();
                    setValues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category._id,
                        stock: data.stock,
                        formData: new FormData()
                    });
                }
            }).catch((err) => { console.log(err); })
        );
    };

    useEffect(() => {
        preload(productId);
    }, []);

    const handleChange = name => event => {
        const value = (name === 'photo') ? (event.target.files[0]) : (event.target.value);
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: '', loading: true });

        updateProduct(user._id, token, formData, productId).then((data) => {
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
                    createdProduct: data.name,
                    getRedirect: true
                });
            }
        }).catch((err) => { console.log(err); });
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-5" style={{ display: (createdProduct) ? '' : 'none' }}>
                <h4>{createdProduct} Product Updated Successfully!</h4>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-5" style={{ display: (error) ? '' : 'none' }}>
                <h4>Product Updation Failed With Error: {error}</h4>
            </div>
        );
    };

    const goBack = () => {
        return (
            <div className="mt-4 mb-5 d-flex justify-content-between">
                <div>
                    <Link className='btn btn-md btn-success' to='/admin/products'>{`< Manage Products`}</Link>
                </div>
                <div>
                    <Link className='btn btn-md btn-success' to='/admin/dashboard'>{`Admin Dashboard >`}</Link>
                </div>
            </div>
        );
    };

    const updateProductForm = () => {
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
                    <select onChange={handleChange('category')} className="form-control" placeholder="Category" value={category}>
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
                <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3">Update Product</button>
            </form>
        );
    };
    
    // TODO: Perform Navigate execution after suucess message with delay
    
    return (
        <Base title='Update Product' description='Update Product Information' className='container bg-success p-4'>
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2 text-white pb-5">
                    {goBack()}
                    {updateProductForm()}
                    {successMessage()}
                    {errorMessage()}
                    {/* {performRedirect()} */}
                </div>
            </div>
        </Base>
    );

};

export default UpdateProduct;
