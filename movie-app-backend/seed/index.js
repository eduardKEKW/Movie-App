const dot = require('dotenv/config');
const fs = require('fs');
const Movie = require('../models/movie.js');
const mongoose = require('mongoose');
const connectDb = require('../utils/db.js')(mongoose);
const colors = require('colors');

const { create: createMovies, destroy: destroyMovies } = require('./movies.js');
const { create: createActors, destroy: destroyActors } = require('./actors.js');
const { create: createUsers, destroy: destroyUsers } = require('./users.js');

const createDB = () => {
    Promise.all([
        createMovies(),
        createUsers(),
    ])
    .then(() => {
        console.log('DB Seeded...'.green.inverse);
        process.exit();
    })
    .catch((err) => {
        process.exit();
    });
}

const destroyDB = () => {
    Promise.all([
        destroyActors(),
        destroyMovies(),
        destroyUsers(),
    ])
    .then(() => {
        console.log('DB destroyed...'.red.inverse);
        process.exit();
    })
    .catch((err) => {
        process.exit();
    });
}


// node seed -d | -s ?{model}
// node seed -d | -s
if(process.argv[2] === '-s'){
    if(process.argv[3]){
        const { create, destroy } = require(`./${process.argv[3]}.js`);
        create();
    } else {
        createDB();
    }
} else if(process.argv[2] === '-d') {
    if(process.argv[3]){
        const { create, destroy } = require(`./${process.argv[3]}.js`);
        destroy();
    } else {
        destroyDB();
    }
}