const dot = require('dotenv/config');
const mongoose = require('mongoose');
const faker = require('faker');
const colors = require('colors');

const User = require('../models/user');

const create = async (count = 10) => {
    try {
        const userData = new Array(count).fill(0).map(_ => {
            return {
                username: faker.name.findName(),
                password: 'secret',
                roles: [],
                types: ['actor', 'writer', 'director'],
                avatar: faker.image.avatar(),
                email: faker.internet.email(),
            }
        });
        
        const users = await User.create(userData);

        console.log("Users Collection Seeded...".green.inverse);

        return users;

    } catch(err) {
        console.error(err);
    }
}

const destroy = async () => {
    try {
        await User.deleteMany();

        console.log('Users Collection Deleted...'.red.inverse);

        return;

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    create,
    destroy,
}