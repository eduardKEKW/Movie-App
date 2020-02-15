const User = require('../models/user.js');
const Movie = require('../models/movie.js');
const User_Rating = require('../models/User_Rating.js');
const Actor_Rating = require('../models/Actor_Rating.js');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorRes = require('../utils/error.js');

module.exports.getSuggestions = asyncHandler(async (req, res, next) => {
    const { name = "" } = req.query;
    
    const users = await User
        .find({ $text: { $search: name } })
        .select('username avatar types')
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(201).json({ data: users, success: true });
});


module.exports.getNotifications = asyncHandler(async (req, res, next) => {
    const user =  await User.findById(req.user._id).populate('notifications');

    res
        .status(201)
        .json({ data: user.notifications, success: true });
});


module.exports.updateInfo = asyncHandler(async (req, res, next) => {
    const { username, email, types } = req.query;

    const users = await User
        .find({ $text: { $search: name } })
        .select('username avatar types')
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(201).json({ data: users, success: true });
});


module.exports.addToWatchlist = asyncHandler(async (req, res, next) => {
    const { _id } = req.body;

    if (req.user.watchList.includes(_id)) {
        req.user.watchList.splice(req.user.watchList.indexOf(_id), 1);
    } else {
        req.user.watchList.push(_id);
    }

    const user = await req.user.save();

    res.status(201).json({ data: user, success: true });
});


module.exports.getUser = asyncHandler(async (req, res, next) => {
    const token = req.user.getJWToken();
    await req.user.populate('notifications').execPopulate();

    res.status(201).json({ data: {
        user: req.user,
        token,
    }, success: true });
});


module.exports.addToFavorite = asyncHandler(async (req, res, next) => {
    const { _id } = req.body;
    
    if(req.user.favoriteMovies.includes(_id)){
        req.user.favoriteMovies.splice(req.user.favoriteMovies.indexOf(_id),1);
    } else {
        req.user.favoriteMovies.push(_id);
    }
    
    const user = await req.user.save();

    res.status(201).json({ data: user, success: true });
});



module.exports.getRatings = asyncHandler(async (req, res, next) => {
    const { movieId } = req.query;
    const { _id: userId } = req.user;

    const ratings = await Promise.all([
        User_Rating.findOne({
            movieId,
            userId,
        }),
        Actor_Rating.find({
            movieId,
            userId,
        }).select('stars actorId -_id')
    ]);

    res.status(201).json({ data: {
        movie: ratings[0] || {},
        actors: ratings[1].reduce((acc,curr) => {
            acc[curr.actorId] = curr.stars;
            return acc;
        },{}),
    }, success: true });
});