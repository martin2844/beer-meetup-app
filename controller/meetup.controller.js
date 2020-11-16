const Meetup = require('../models/Meetup');
const User = require('../models/User');
const logger = require('../utils/logger')(module);
const redis = require("../services/cache");
const util = require("util");
const notificationController = require('./notification.controller');
redis.del = util.promisify(redis.del);

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
        redis.del('{"collection":"meetups"}');

        const notificationPromises = []
        //Get all users
        const users = await User.find();
        //Send notifications to all users.
        users.forEach((user) => {
            const notification = {
                sender: meetUp._id,
                content: `Se creo una nueva meetup: ${meetUp.name}`,
                receiver: user._id
            }
            notificationPromises.push(notificationController.createNotification(notification));
        })

        Promise.all(notificationPromises).then(x => console.log("Sent Notifications")).catch(x => console.log(x));
   
        
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
        let filter = meetup.attendees.filter((x) => {
            return JSON.stringify(x) === JSON.stringify(user_id);
        });
        console.log(filter);
        if(filter.length) {
            logger.info("Attendee allready present")
            return false
        }
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
        const meetup = await Meetup.findById(id).cache();
        return meetup;
    } catch (error) {
        return error;
    } 
}

const getMeetupAttendees = async (id) => {
    try {
        const meetup = await Meetup.findById(id).cache();
        let attendeePromises = [];
        meetup.attendees.forEach(async (at) => {
            attendeePromises.push(User.findById(at));
            
        })
        let attendees = await Promise.all(attendeePromises);
        attendees = attendees.map((at) => {
            return at.name;
        })
        console.log(attendees);
        return attendees;
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
    getAllMeetups,
    getMeetupAttendees
}