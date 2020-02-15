const User = require('../models/user.js');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorRes = require('../utils/error.js');
const getTokenOptions = require('../utils/tokenOptions');

module.exports.register = asyncHandler(async (req, res, next) => {
    const { email, password, password_confirmation,  username, types } = req.body;

    if(!password_confirmation || password !== password_confirmation ){
        return res.status(400).json({
            success: false,
            errors: {
                password_confirmation: 'Password does not match.'
            }
        })
    }
    
    const user = await User.create({
        email,
        password,
        username,
        types,
    });

    const token = user.getJWToken();
    user.notify(`Welcome ${user.username}!`);

    res
        .status(200)
        .cookie('token', token, getTokenOptions())
        .json({
            success: true,
            data: user,
            token
    });

});

module.exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorRes( 'Please provide an email and password.' ,400));
    }
    
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorRes('Email not found.',401));
    }

    if(!(await user.comparePassword(password))) {
        return next(new ErrorRes('Credentials do not match.',401));
    }

    const token = user.getJWToken();
    user.password = null;
    
    res
        .status(200)
        .cookie('token', token, getTokenOptions())
        .json({
            success: true,
            data: user,
            token
        });
});

module.exports.forgotPassword = asyncHandler(async (req, res, next) => {
     const { email } = req.body;

     const user = await User.findOne({ email });

     if(!user){
         return next(new ErrorRes('Email not found',401));
     }

     const resetToken = user.getPasswordResetToken();

     res.status(200).json({
         success: true,
         data: user
     });
});


module.exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res
        .status(200)
        .json({
            success: true
        });
});


module.exports.getMe = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            data: req.user
        });
});