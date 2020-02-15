const mongoose = require('mongoose');
const { redisClient } = require('../utils/redis');

const ActorSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: [60, 'Name must be under 60 chars.'],
        trim: true,
        require: 'You must enter a name.',
        index: 'text',
    },
    slug: { type: String },
    starredIn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    born: Date,
    gallery: [String],
    avatar: String,
    bio: String,
    popularity: { type: Number, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

ActorSchema.pre('save',function (next) {
    this.slug = this.name.split(/ +/).join('-').toLowerCase();
    next();
});

ActorSchema.post('findOne', async function({ name, _id, popularity }) {
    redisClient.HGET(`actors_popularity`, name, async (err, res) => {
        if(!err && res){
            await mongoose.models['Actor'].findByIdAndUpdate(_id, {
                $set: {
                    'popularity': +res - popularity,
                }
            });
        }
    });
});

ActorSchema.virtual('actor_ratings', {
    ref: 'Actor_Rating',
    localField: '_id',
    foreignField: 'actorId',
    justOne: false,
});

module.exports = mongoose.model('Actor', ActorSchema);