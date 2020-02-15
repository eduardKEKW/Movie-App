const dot = require('dotenv/config');
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');

const Movie = require('../models/movie.js');
const Actor = require('../models/actor.js');

const { create: createActors } = require('./actors');
const { create: createRating } = require('./movieRating');

const create = async () => {
    try {
        const movies = JSON.parse(fs.readFileSync('seed/imdbData/imdb.json','utf-8')).map(movie => JSON.parse(movie));
        
        const parsedMovies = await Promise.all(
            movies.map(async movie => {
                const _id = mongoose.Types.ObjectId();

                const actors = await Promise.all(
                    movie.Actors
                        .split(',')
                        .map(actor => createActors({ movieId: _id, name: actor },1))
                );

                return {
                    _id: _id,
                    title: movie.Title,
                    otherRatings: [...movie.Ratings, { source: 'Imdb', value: movie.imdbRating  }],
                    actors: actors.map(actor => actor[0]._id),
                    ratings: createRating(),
                    year: movie.Year,
                    rated: movie.Rated,
                    released: movie.Released,
                    runtime: movie.Runtime,
                    genres: movie.Genre,
                    directors: [movie.Director],
                    writers: [movie.Writer],
                    plot: movie.Plot,
                    lang: movie.Language,
                    awards: movie.Awards,
                    poster: movie.Poster,
                    poduction: movie.Production,
                    popularity: Math.floor(Math.random() * 1000 ),
                }
        }));
        
        await Movie.create(parsedMovies);

        console.log('Movies Collection Seeded...'.green.inverse);

        return;

    } catch(err) {
        console.error(err);
    }
}

const destroy = async () => {
    try {
        await Movie.deleteMany();

        console.log('Movie Collection Deleted...'.red.inverse);

        return;

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    create,
    destroy,
}