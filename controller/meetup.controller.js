const Meetup = require('../models/Meetup');
const logger = require('../utils/logger')(module);

const deleteMeetup = async(id) => {
    logger.info("About to delete meetup: " + id);
    try {
        let deleted = await Meetup.findOneAndDelete({_id: id});
        if(!deleted) {
            throw ("Meetup Not Found");
        }
        return true;
    } catch (error) {
        logger.error(error);
        return false
    }
}

//Create meetup Function
const createMeetup = async (meetupData) => {
    const meetUp = new Meetup({
        ...meetupData
    })
    try {
        await meetUp.save();
        logger.info("Successfully created meetup: " + meetUp.name + "With id: " + meetUp._id);
        return meetUp;
    } catch (error) {
        return error
    }
}

//Add attendee function
const addAttendee = async (id, user_id) => {
    logger.info("Adding atendee for meetup " + id);
    try {
        const meetup = await Meetup.findById(id);
        meetup.attendees.push(user_id);
        await meetup.save();
        return true;
    } catch (error) {
        return error;
    }


}

const checkIn = async (id, user_id) => {
    logger.info("checking in atendee for meetup " + id);
    try {
        const meetup = await Meetup.findById(id);
        meetup.checkedIn.push(user_id);
        await meetup.save();
        return true;
    } catch (error) {
        return error;
    }
}

const getMeetup = async (id) => {
    try {
        const meetup = await Meetup.findById(id);
        return meetup;
    } catch (error) {
        return error;
    }
}

const getAllMeetups = async () => {
    try {
        const meetups = await Meetup.find().cache();
        return meetups;
    } catch (error) {
        return error;
    }
}





module.exports = {
    createMeetup,
    addAttendee,
    checkIn,
    getMeetup,
    deleteMeetup,
    getAllMeetups
}