const express = require('express');
const router = express.Router();
const { createMovie, getMovies, getMovie, getSuggestions, getTopReleases, getUpcoming, rateMovie, rateMovieActor,  } = require('../controllers/movie.js');
const { authenticate, authorize } = require('../middleware/auth');
const { count } = require('../middleware/count');

router
    .route('/')
    .post(authenticate, authorize('admin'), createMovie)
    .get(getMovies);


    //count
router.get('/single', authenticate({ required: false }), getMovie);
router.get('/top', getTopReleases);
router.get('/suggestions', getSuggestions);
router.get('/movies', getMovies);
router.get('/upcoming', getUpcoming);

router.post('/rate', authenticate(), rateMovie);
router.post('/rate/actor', authenticate(), rateMovieActor);

module.exports = router;