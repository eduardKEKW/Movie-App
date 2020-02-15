const mongoose = require('mongoose');

const userRatingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    scarry: { type: Number, min: 1, max: 10 },
    funny: { type: Number, min: 1, max: 10 },
    sad: { type: Number, min: 1, max: 10 },
    suspense: { type: Number, min: 1, max: 10 },
    intrigue: { type: Number, min: 1, max: 10 },
});

userRatingSchema.index({
    userId: 1,
    movieId: 1,
},{ name: 'UM_ID', unique: true });

module.exports = mongoose.model('User_Rating', userRatingSchema);