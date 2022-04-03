import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';


const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: ''
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
        return products.reduce((currentValue, nextValue) => {
            return (currentValue + (nextValue.count * nextValue.price));
        }, 0);
    };

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay With Stripe</button>
        ) : (
            <Link to='/signin'>
                <button className='btn btn-warning'>Sign In</button>
            </Link>
        );
    };

    return (
        <div>
            <h3 className='text-white'>Stripe Checkout Loaded</h3>
            <h3 className='text-white'>{getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;
