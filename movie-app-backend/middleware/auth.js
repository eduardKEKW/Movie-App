const ErrorRes = require('../utils/error');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports.authenticate = ({ required = true } = {}) => asyncHandler(async (req, res, next) => {
    if(!req.headers.authorization){
        return required ? next(new ErrorRes('Not authorized.',401)) : next();
    }

    const [ name, token ] = req.headers.authorization.split(' ');

    if(name !== 'Bearer' || !token){
        return required ? next(new ErrorRes('Not authorized.',401)) : next();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if(!user){
        return required ? next(new ErrorRes('Not authorized.',401)) : next();
    }

    req.user = user;

    next();
});

module.exports.authorize = (...roles) => asyncHandler(async (req, res, next) => {

    if(!req.user){
        return next(new ErrorRes('Not authorized.',401));
    }

    if(roles.includes('none') && req.user){
        return next(new ErrorRes('Not authorized.',401));
    }

    if(!roles.every(role => req.user.roles.includes(role))){
        return next(new ErrorRes('Not authorized.',401));
    }

    next();
});