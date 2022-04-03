const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

exports.signup = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    };

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: 'Not able to save user in DB'
            });
        }
        res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user._id
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    };

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User Email Does Not Exist'
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and Password Do Not Match'
            });
        }

        //Create Token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //Put Token in Cookie
        res.cookie('token', token, { exp: new Date() + 9999 });

        //Send Response To Front-End
        const { _id, firstname, email, role } = user;
        return res.json({ token, user: { _id, firstname, email, role } });

    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        'message': 'User SignOut Success'
    });
};

//Protected Routes
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

//Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!checker) {
        return res.status(403).json({
            error: "Access Denied"
        });
    }

    next();
};

exports.isAdmin = (req, res, next) => {
    
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not Admin, Access Denied"
        });
    }

    next();
};