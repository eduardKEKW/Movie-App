const mongoose = require('mongoose');

const actorRatingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stars: { type: Number, min: 1, max: 10 },
});

actorRatingSchema.index({
    userId: 1,
    movieId: 1,
    actorId : 1,
}, { name: 'UMA_ID', unique: true });

module.exports = mongoose.model('Actor_Rating', actorRatingSchema);