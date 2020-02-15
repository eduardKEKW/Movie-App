require('../models/actor');
require('../models/movie');
require('../models/user');
require('../models/User_Rating');
require('../models/Actor_Rating');
require('../models/notifications');


const connectMongo = (mongoose) => {
    mongoose.set('debug', true);
    mongoose.connection.on('error', () => connectMongo(mongoose));
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-wyzwr.mongodb.net/movie-app?retryWrites=true&w=majority`,
        {
            autoIndex: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }
    ).then(() => console.log('DB connected'.green.inverse));
}

module.exports = (mongoose) => {
    connectMongo(mongoose);
}