const mongoose = require('mongoose');

const create = () => {
    return {
        scarry: random(),
        funny: random(),
        sad: random(),
        suspense: random(),
        intrigue: random(),
    }
}

const random = () => {
    const totalVotes = Math.floor(Math.random() * 100);
    const totalPoints = Math.floor((Math.random() * 10) * totalVotes);
    const totalScore = Math.floor(totalVotes / totalPoints);

    return {
        totalPoints,
        totalVotes,
        totalScore
    }
}

module.exports = {
    create
}