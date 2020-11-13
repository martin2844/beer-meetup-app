const axios = require("axios");
const convertDate = require('../utils/unixDate');

const getWeather = async () => {
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

    return weatherData.data;
}

module.exports = {
    getWeather
}