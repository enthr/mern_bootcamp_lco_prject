import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({ product, addToCartBtn = true, removeFromCartBtn = false, setReload = f => f, reload = undefined }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : 'Product Name';
    const cardPrice = product ? product.price : 'Product Price';

    const addToCart = () => {
        addItemToCart(product, () => { setRedirect(true); });
    };

    const getARedirect = (redirect) => {
        if (redirect) {
            return (
                <Navigate to='/cart' />
            );
        }
    };

    const showAddToCart = (addToCartBtn) => {
        return (
            addToCartBtn && <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add to Cart
            </button>
        );
    };

    const showRemoveFromCart = (removeFromCartBtn) => {
        return (
            removeFromCartBtn && <button
                onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
                Remove from cart
            </button>
        );
    };

    return (
        <div className="card text-white bg-dark border">
            {/* <div className="card-header lead">A photo from pexels</div> */}
            <div className="card-body p-4">
                <ImageHelper product={product} />
                <p className="lead font-weight-normal text-wrap">{cardTitle}</p>
                <p className="btn btn-success rounded px-4 py-2 btn-md">$ {cardPrice}</p>
                <div className="d-grid gap-1 mt-2">
                    {showAddToCart(addToCartBtn)}
                    {showRemoveFromCart(removeFromCartBtn)}
                    {getARedirect(redirect)}
                </div>
            </div>
        </div>
    );
};

export default Card;
