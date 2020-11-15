const axios = require("axios");
const convertDate = require('../utils/unixDate');
const redis = require('../services/cache');
const util = require('util');
const logger = require("../utils/logger")(module);
//Promesify;
redis.get = util.promisify(redis.get);
redis.set = util.promisify(redis.set);

const getWeather = async () => {
    logger.info("getting weather");
    //First Check cache
    // Key set
    const key = 'weather';
    const cacheVal = await redis.get(key);
    if(cacheVal) {
        logger.info("Serving Cache");
        const cachedDoc = JSON.parse(cacheVal);
        return cachedDoc;
    }
    //Lat and Long from BA
    const lat = -34.4708198;
    const lon = -58.5286478;
    //Get weather data from openweather map
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&lang=es&units=metric&appid=${process.env.WEATHER_API}`);
    //Map our results to convert to human readable time
    let dailyArray = weatherData.data.daily;
    dailyArray.map((forecast) => {
        let humanTime = convertDate(forecast.dt);
        humanTime = humanTime.substr(0, humanTime.indexOf(","));
        forecast.dt = humanTime;
        forecast.sunrise = convertDate(forecast.sunrise);
        forecast.sunset = convertDate(forecast.sunset);
        return forecast
    });
    logger.info("Serving Api Data");
    redis.set(key, JSON.stringify(dailyArray), 'EX', 60 * 5);
    return dailyArray;
}

const getWeatherFor = async (date) => {
    
    const dailyArray = await getWeather();
    const weather = dailyArray.filter((forecast) => {
        return forecast.dt === date;
    })
    //What happens if the date is not here? 
    return weather[0];
}

module.exports = {
    getWeather,
    getWeatherFor
}