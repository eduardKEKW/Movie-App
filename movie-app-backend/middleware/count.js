const ErrorRes = require('../utils/error');
const asyncHandler = require('../utils/asyncHandler');
const { redisClient } = require('../utils/redis');

module.exports.count = (model) => asyncHandler(async (req, res, next) => {
    next();
    switch (model) {
        case 'Movie':
            //redisClient.HINCRBY(`movies_popularity`, req.body.slug, 1);
            break;
        
        case 'Actor':
            //redisClient.HINCRBY(`actors_popularity`, req.body.slug, 1);
            break;

        default:
            next();
    }
    next();
});