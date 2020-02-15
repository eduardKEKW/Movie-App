const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        maxlength: [20, 'Username must be under 20 chars.'],
        required: 'You must enter a username.',
        trim: true,
        unique: 'Username alredy used.',
        index: 'text',
    },
    email: {
        type: String,
        unique:'Email alredy used.',
        require: [true, 'Please add an email address.'],
        match: [
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please add a valid email.'
        ],
    },
    types: {
        type: [String],
        enum: ['actor', 'writer', 'director'],
    },
    roles: {
        type: [String],
        enum: ['admin', 'user'],
        default: ['user']
    },
    password: {
        type: String,
        require: [true,'Please add an password.'],
        minlength: 6,
        select: false,
    },
    avatar: String,
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    favoriteActors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
UserSchema.plugin(beautifyUnique);


// MIDDLEWARE
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this._id = mongoose.Types.ObjectId();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});


// METHODES
UserSchema.methods.getJWToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    this.token = token;
    return token;
}

UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

UserSchema.methods.notify = async function(mss) {
    const message = await mongoose.models['Notification'].create({
        user_id: this._id,
        message: mss,
        seen: false,
        from: 'Admin'
    });

    return message;
}

// VRTUALS
UserSchema.virtual('notifications',{
    ref: 'Notification',
    localField: '_id',
    foreignField: 'user_id',
    justOne: false,
    options: {
        sort: { createdAt: -1 },
        where: { seen: false }
    }
});



module.exports = mongoose.model('User', UserSchema);