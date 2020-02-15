const redis = require('redis');

// const redisClient = redis.createClient();

// redisClient
//     .on('connect', () => {
//         console.log('Redis connected.'.green.inverse);
//     })
//     .on('error', (error) => {
//         console.log('REDIS ERROR: '.red,error);
//     });


const expires = {
    movies: {
        popularity: 10000,
    }
}

module.exports = {
    expires,
    redisClient: null
}