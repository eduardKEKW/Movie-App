const createError = require('http-errors');
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const { authenticate } = require('./middleware/auth');
const errorHandler = require('./middleware/error.js');

const movieRouter = require('./routes/movie');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const actorRouter = require('./routes/actors');

const mongoose = require('mongoose');
const connectDb = require('./utils/db.js')(mongoose);

const app = express();
const whitelist = ['https://mapp-frontend.herokuapp.com'];

// middware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize({ replaceWith: '_' }));
app.use(helmet());
app.use(cors({
  origin: (origin, next) => {
    if (whitelist.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error('Not allowed by CORS'));
    }
  }
}));
// custom routes
app.use('/api/movie', movieRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/actor', actorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('NOT FOUND ');
  next(createError(404));
});

// handle errors
app.use(errorHandler);

// unhandle errors
process.on('unhandledRejection',(err, promise) => {
  console.log(`ERROR_UNHANDLE: ${err.message} \n ${err}`.red);
});

module.exports = app;
