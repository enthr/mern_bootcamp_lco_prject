const express = require('express');
const router = express.Router();

const { getCategoryById, createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');


// parameter extractor
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

/* Routes */

// Create
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory);

// Read
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);

// Update
router.put('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory);

// Delete
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;