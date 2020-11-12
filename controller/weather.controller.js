const axios = require("axios");

const getWeather = async () => {
    const lat = -34.4708198;
    const lon = -58.5286478;
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&lang=es&units=metric&appid=${process.env.WEATHER_API}`);

    return weatherData.data;
}

module.exports = {
    getWeather
}