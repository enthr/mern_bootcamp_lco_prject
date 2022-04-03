const express = require('express');
const router = express.Router();

const { getProductById, createProduct, getProduct, getAllProducts, photo, updateProduct, deleteProduct, getAllUniqueCategories } = require('../controllers/product');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// Parameter Extractor
router.param('userId', getUserById);
router.param('productId', getProductById);

/* Routes */

// Create
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);

// Read
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

// Update
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct);

// Delete
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct);

// Listing Route
router.get('/products', getAllProducts);

// List Categories
router.get('/product/categories', getAllUniqueCategories);

module.exports = router;