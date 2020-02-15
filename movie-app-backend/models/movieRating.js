const mongoose = require('mongoose');

const movieRatingSchema = mongoose.Schema({
    scarry: {
        totalPoints: { type: Number, default: 0 },
        totalVotes:  { type: Number, default: 0 },
        totalScore:  { type: Number, min: 0, max: 10, default: 0 },
    },
    funny: {
        totalPoints: { type: Number, default: 0 },
        totalVotes:  { type: Number, default: 0 },
        totalScore:  { type: Number, min: 0, max: 10, default: 0 },
    },
    sad: {
        totalPoints: { type: Number, default: 0 },
        totalVotes:  { type: Number, default: 0 },
        totalScore:  { type: Number, min: 0, max: 10, default: 0 },
    },
    suspense: {
        totalPoints: { type: Number, default: 0 },
        totalVotes:  { type: Number, default: 0 },
        totalScore:  { type: Number, min: 0, max: 10, default: 0 },
    },
    intrigue: {
        totalPoints: { type: Number, default: 0 },
        totalVotes:  { type: Number, default: 0 },
        totalScore:  { type: Number, min: 0, max: 10, default: 0 },
    },
}, { _id: false });

module.exports = movieRatingSchema;