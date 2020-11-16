const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification; 