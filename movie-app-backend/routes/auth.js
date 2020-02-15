const { register, login, logout, getMe } = require('../controllers/auth');
const { authorize, authenticate } = require('../middleware/auth'); 

const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/user', authenticate(), getMe);

module.exports = router;