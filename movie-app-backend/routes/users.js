const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getSuggestions, getNotifications, addToWatchlist, getUser, addToFavorite, getRatings } = require('../controllers/user');

router.get('/suggestions', getSuggestions);
router.get('/notifications', authenticate(), getNotifications);
router.get('/me', authenticate(), getUser);
router.get('/ratings', authenticate(), getRatings);

router.post('/watchlist', authenticate(), addToWatchlist);
router.post('/favorite', authenticate(), addToFavorite);


module.exports = router;
