const mongoose = require('mongoose');
const logger = require('../utils/logger')(module);

const connectDB = () => {
    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI,{useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    logger.info("mongoose status:" + mongoose.connection.readyState);
    logger.info("connected to " + mongoose.connection.name)
    return(mongoose.connection.readyState);
}


module.exports = connectDB;