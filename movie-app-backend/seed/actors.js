const dot = require('dotenv/config');
const mongoose = require('mongoose');
const faker = require('faker');
const colors = require('colors');

const Actor = require('../models/actor.js');

const create = async ({ movieId = null, name } = {}, count = 1) => {
    try {
        const actorsData = new Array(count).fill(0).map(_ => {
            return {
                name: name || faker.name.findName(),
                starredIn: [ movieId || mongoose.Schema.Types.ObjectId ],
                born: faker.date.past(),
                gallery: [ faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl() ],
                avatar: faker.image.avatar(),
                bio: faker.lorem.paragraph(),
                popularity: Math.floor(Math.random() * 100)
            }
        });
        
        const actors = await Actor.create(actorsData);

        console.log("Actors Collection Seeded...".green.inverse);

        return actors;

    } catch(err) {
        console.error(err);
    }
}

const destroy = async () => {
    try {
        await Actor.deleteMany();

        console.log('Actors Collection Deleted...'.red.inverse);

        return;

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    create,
    destroy,
}