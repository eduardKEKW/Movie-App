const mongoose = require('mongoose');
const { redisClient } = require('../utils/redis');
const movieRatingSchema = require('./movieRating.js');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: [120, 'Title must be under 120 chars.'],
        required: 'You must enter a title.',
        trim: true,
    },
    slug: {
        type: String,
        require: true,
        index: 'text',
        unique: true,
    },
    otherRatings: [{ source: String, value: String  }],
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    ratings: movieRatingSchema,
    popularity: { type: Number, default: 0 },
    year: Number,
    rated: String,
    released: { type: Date },
    runtime: String,
    genres: [String],
    directors: [String],
    writers: [String],
    plot: String,
    lang: String,
    awards: String,
    poster: String,
    production: String,
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

MovieSchema.pre('save', function(next) {
    this.slug = this.title.split(/ +/).join('-').toLowerCase();
    this.title = `${this
        .title
        .split(/ +/)
        .map(e => `${e[0].toUpperCase()}${e.slice(1)}`)
        .join(' ')} (${this.year || 'Unknown'})`;

    next();
});

MovieSchema.post('findOne', function(doc) {
    return;
    const { slug, _id, popularity } = doc;

    redisClient.HGET(`movies_popularity`, slug, async (err, res) => {
        if(!err && res){
            await mongoose.models['Movie'].findByIdAndUpdate(_id, {
                $set: {
                    'popularity': +res - popularity,
                }
            });
        }
    });
});

MovieSchema.virtual('user_ratings', {
    ref: 'User_Rating',
    localField: '_id',
    foreignField: 'movieId',
    justOne: true,
});

module.exports = mongoose.model('Movie', MovieSchema);