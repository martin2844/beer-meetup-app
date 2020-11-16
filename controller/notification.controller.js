const Notification = require('../models/Notification');
const logger = require('../utils/logger')(module);


const createNotification = async (data) => {
    const {sender, receiver, content} = data;
    const notification = new Notification({
        sender: sender,
        receiver: receiver,
        content: content,
        isRead: false,
        date: Date.now()
    })
    try {
        await notification.save();
        logger.info("Successfully created notification for user with ID " + receiver);
        return notification;
    } catch (error) {
        return error
    }

}

const getNotifications = async (id) => {
    console.log("Getting Notifications");
    const query = await Notification.find({'receiver': id});
    return query;
}

const readNotifications = async (id) => {
    const query = await Notification.updateMany({'receiver': id}, {'isRead': true});
    console.log(query)
    return query;
}



module.exports = {
    createNotification,
    getNotifications,
    readNotifications
}