import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import PaymentB from './PaymentB';
import StripeCheckout from './StripeCheckout';

const Cart = () => {

    const [products, setProducts] = useState([]);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div className="">
                <h2>Section To Load Products</h2>
                {products.map((product, index) => {
                    return (
                        <Card
                            key={index}
                            product={product}
                            addToCartBtn={false}
                            removeFromCartBtn={true}
                            setReload={setReload}
                            reload={reload}
                        />
                    );
                })}
            </div>
        );
    };

    const loadCheckout = () => {
        return (
            <div className="">
                <h2>Section For Checkout</h2>
                <PaymentB products={products} setReload={setReload} reload={reload} />
                {/* <StripeCheckout products={products} setReload={setReload} reload={reload} /> */}
            </div>
        );
    };

    return (
        <Base title='Cart' description='Your Shopping Cart'>
            <div className="container">
                <div className="row text-center">
                    <div className="col-7 p-5">
                        {(products) ? loadAllProducts(products) : (<h2>No Products in Cart</h2>)}
                    </div>
                    <div className="col-5">
                        {loadCheckout()}
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default Cart;
