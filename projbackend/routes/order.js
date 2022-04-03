const express = require('express');
const router = express.Router();

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/order');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { updateStock } = require('../controllers/product');

// params
router.param('userId', getUserById);
router.param('orderId', getOrderById);


/* Routes */

// Create
router.post('/order/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

// Read
router.get('/order/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllOrders);

// Order Status
router.get('/order/status/:userId', isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put('/order/:orderId/status/:userId', isSignedIn, isAuthenticated, isAdmin, updateStatus);


module.exports = router;