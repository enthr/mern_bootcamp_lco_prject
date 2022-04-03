import React, { useState, useEffect } from 'react';
import '../style.css';
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';


const Home = () => {

    const [products, setProducts] = useState([]);

    const [error, setError] = useState('');

    const loadAllProducts = () => {
        return (
            getAllProducts().then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProducts(data);
                }
            }).catch((err) => { console.log(err); })
        );
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    return (
        <Base title='Home' description='Welcome to iShop' className='container'>
            <div className="row text-center">
                <h1 className="text-white mb-5">All Products</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
};

export default Home;
