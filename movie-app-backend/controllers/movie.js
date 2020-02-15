const Movie = require('../models/movie.js');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorRes = require('../utils/error.js');
const User_Rating = require('../models/User_Rating.js');
const Actor_Rating = require('../models/Actor_Rating.js');

module.exports.createMovie = asyncHandler(async (req, res, next) => {
    const movie = await new Movie({
        ...req.body,
    }).save();

    res.status(201).json({ data: movie, success: true });
});



module.exports.getMovies = asyncHandler(async (req, res, next) => {
    const { filters = [], perPage = 10, page = 0 } = req.query;

    const sortBy = filters.map(filter => `-ratings.${filter.toLowerCase()}.totalScore`).join(' ');
    
    const results = await Movie
        .find()
        .sort(sortBy)
        .skip(+perPage * +page)
        .limit(+perPage)
        .select('slug title ratings poster');

    res.status(200).json({
        success: true,
        data: results,
    });

});


module.exports.getTopReleases = asyncHandler(async (req, res, next) => { 
    const releases = await Movie
        .find({ released: { $lte: new Date(new Date() - (7 * 24 * 60 * 60 * 1000)) } })
        .sort({ populariy: 1 })
        .limit(5)
        .select('title slug poster awards released');

    res.status(200).json({
        success: true,
        data: releases,
    })
});


module.exports.getUpcoming = asyncHandler(async (req, res, next) => {
    const upcoming = await Movie
        .find()
        .select('title slug popularity rated genres released')
        .populate('actors', 'popularity name')
        .sort({ released: -1 })
        .limit(6);

    res.status(200).json({
        success: true,
        data: upcoming,
    })
});


module.exports.getSuggestions = asyncHandler(async (req, res, next) => {
    const { name = '' } = req.query;
    
    const suggestions = await Movie
        .find({ $text: { $search: name } })
        .select('title poster popularity genres directors slug')
        .sort('-year')
        .limit(5);

    res.status(200).json({
        success: true,
        data: suggestions,
    });
});


module.exports.getMovie = asyncHandler(async (req, res, next) => {
    const { slug } = req.query;
    
    const movie = await Movie.findOne({ slug });

    if (!movie) {
        next(new ErrorRes('No movie found.', 404));
    }
    
    await movie.populate({
        path: 'actors',
        populate: { 
            path: 'actor_ratings',
            match: { movieId: movie._id },
            select: 'stars'
        },
    }).execPopulate();

    const json = movie.toObject();

    json.actors.forEach((actor) => {
        actor.actor_ratings = actor
            .actor_ratings
            .reduce((acc,curr) => {
                acc.totalVotes++;
                acc.totalPoints += curr.stars;
                return acc;
            },{ totalVotes: 0, totalPoints: 0 });
    });

    res.status(200).json({
        success: true,
        data: json,
    });
});


module.exports.rateMovie = asyncHandler(async (req, res, next) => {
    const { _id: movieId } = req.body;
    const { _id: userId } = req.user;

    const values = ["scarry", "funny", "sad", "suspense", "intrigue"];

    const body = values.reduce((acc,curr) => {
        if(req.body[curr]){
            acc[curr] = req.body[curr];
        }
        return acc;
    },{});

    const rating = await User_Rating.findOneAndUpdate({
        movieId,
        userId,
    }, {
        ...body,
        movieId,
        userId,
    }, { upsert: true, runValidators: true, new: true });

    res.status(201).json({ data: rating, success: true });
});


module.exports.rateMovieActor = asyncHandler(async (req, res, next) => {
    const { movieId, actorId, stars } = req.body;
    const { _id: userId } = req.user;

    const rating = await Actor_Rating.findOneAndUpdate({
        movieId,
        userId,
        actorId,
    }, {
        movieId,
        userId,
        actorId,
        stars
    }, { upsert: true, runValidators: true, new: true });

    res.status(201).json({ data: rating, success: true });
});