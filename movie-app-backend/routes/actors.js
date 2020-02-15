const express = require('express');
const router = express.Router();
const { getSuggestions, getActor } = require('../controllers/actor.js');
const { count } = require('../middleware/count');

router.get('/single', count('Actor'), getActor);
router.get('/suggestions', getSuggestions);

module.exports = router;
