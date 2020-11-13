const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    notifications: []
});



const User = mongoose.model('user', UserSchema);
module.exports = User; 