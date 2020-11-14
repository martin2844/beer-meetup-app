const express = require("express");
const router = express.Router();
const weatherController = require("../controller/weather.controller");
const logger = require("../utils/logger")(module);


router.get("/", async (req, res) => {
    try {
        //Get Weather from controller
        logger.info("Consulting weather");
        let dailyWeather = await weatherController.getWeather();
        res.status(200).send(dailyWeather);
    } catch (error) {
        logger.error(error.message);
        if(error.status) {
            res.status(error.status).send(error);
        } else {
            res.status(500).send(error);
        }
    }
})


module.exports = router;