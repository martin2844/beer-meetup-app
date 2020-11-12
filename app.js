const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db");
const logger = require('./utils/logger')(module);
//initialize express.
const app = express();
const weatherController = require("./controller/weather.controller");

//Body Parser
app.use(express.json({ extended: false, limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb' }));

//public dir
app.use('/public', express.static(__dirname + '/public/'));

//Initialize DB
connectDB();


// weatherController.getWeather().then(x => console.log(x));
//ROUTES

//Routes
app.use("/api/weather", require("./routes/weather"));

// Add logger process.on
process.on('unhandledRejection', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason) );
    throw reason;
  });
process.on('unhandledException', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason));
    throw reason;
  });
  
const PORT = process.env.PORT || 5069;
app.listen(PORT, console.log(`server started on ${PORT}`));

