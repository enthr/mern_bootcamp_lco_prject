import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { getToken, processPayment } from './helper/paymentBHelper';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({ products, setReload = f => f, reload = undefined }) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getMeToken = (userId, token) => {
        getToken(userId, token).then((data) => {
            if (data.error) {
                setInfo({ ...info, error: data.error });
            } else {
                const clientToken = data.clientToken;
                setInfo({ clientToken });
            }
        }).catch((err) => console.log(err));
    };

    const showbtdropIn = () => {
        return (
            <div className=''>
                {info.clientToken !== null && products.length > 0 ? (
                    <div className='d-grid'>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className='btn btn-success mt-3' onClick={onPurchase}>Buy</button>
                    </div>
                ) : (
                    <h2>Please Log In or Add Somthing To Cart</h2>
                )}
            </div>
        );
    };

    const getAmount = () => {
        let amount = 0;
        amount = products.reduce((currentValue, nextValue) => {
            return (currentValue + (nextValue.count * nextValue.price));
        }, 0);
        return amount;
    };

    const onPurchase = () => {
        setInfo({ loading: true });

        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then((data) => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData).then((res) => {
                setInfo({ ...info, success: res.success, loading: false });

                const orderData = {
                    products: products,
                    transaction_id: res.transaction.id,
                    amount: res.transaction.amount
                };

                createOrder(userId, token, orderData);

                cartEmpty(() => {
                    console.log('Gotta Crash');
                });

                setReload(!reload);
            }).catch((err) => {
                setInfo({ loading: false, success: false });
            });
        }).catch((err) => console.log(err));
    };

    useEffect(() => {
        getMeToken(userId, token);
    }, []);

    return (
        <div>
            <h3>Test BT</h3>
            <h3>Your Bill: {getAmount()}</h3>
            {showbtdropIn()}
        </div>
    );
};

export default PaymentB;
