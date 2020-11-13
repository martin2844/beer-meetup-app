const mongoose = require('mongoose');

const MeetupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    beerQuantity: {
        type: Number
    },
    attendees: [],
    checkedIn: [],
    owner: {
        type: mongoose.Schema.Types.ObjectId
    }
});


const Meetup = mongoose.model('meetup', MeetupSchema);
module.exports = Meetup; 