const mongoose = require('mongoose');

const NotificationsSchema = mongoose.Schema({
    seen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    message: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    from: String,
});

module.exports = mongoose.model('Notification', NotificationsSchema);