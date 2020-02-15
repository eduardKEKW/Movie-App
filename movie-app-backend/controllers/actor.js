const Actor = require('../models/actor.js');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorRes = require('../utils/error.js');

module.exports.getSuggestions = asyncHandler(async (req, res, next) => {
    const { slug } = req.body;

    const actors = await Actor
        .find({ $text: { $search: slug } })
        .select('name avatar types popularity')
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(201).json({ data: actors, success: true });
});


module.exports.getActor = asyncHandler(async (req, res, next) => {
    const { slug } = req.body;

    const actor = await Actor.findOne({ slug }).populate('starredIn');

    res.status(201).json({ data: actor, success: true });
});