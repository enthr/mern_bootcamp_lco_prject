const { check } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/signup', [
    check('firstname').isLength({ min: 2 }).withMessage('First Name Must Be At Least 2 Characters'),
    check('lastname').isLength({ min: 2 }).withMessage('Last Name Must Be At Least 2 Characters'),
    check('email').isEmail().withMessage('Valid Email is Required'),
    check('password').isLength({ min: 3 }).withMessage('Password Must Be At Least 3 Characters')
], signup);

router.post('/signin', [
    check('email').isEmail().withMessage('Enter email Used at Time of SignUp'),
    check('password').isLength({ min: 3 }).withMessage('Password is Required')
], signin);

router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;