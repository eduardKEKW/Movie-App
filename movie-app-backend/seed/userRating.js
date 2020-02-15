const mongoose = require('mongoose');

const create = () => {
    return {
        scarry: Math.floor(Math.random()*10),
        funny: Math.floor(Math.random()*10),
        sad: Math.floor(Math.random()*10),
        suspense: Math.floor(Math.random()*10),
        intrigue: Math.floor(Math.random()*10),
    }
}