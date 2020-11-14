//Beer controller.
//All stuff related to beer goes here.
const logger = require('../utils/logger')(module);
const meetupController = require('./meetup.controller');
const weatherController = require('./weather.controller');
const weatherDate = require('../utils/weatherDate');

const calculateBeer = async (meetup_id) => {
    //Get Meetup Data
    const meetupData = await meetupController.getMeetup(meetup_id);
    const attendees = meetupData.attendees.length;
    const date = weatherDate(meetupData.date);
    //Get weather data for that day
    let weather = await weatherController.getWeatherFor(date);
    //If no weather, that means the meetup is far to in advanced that we dont have weather data. We just forecast for the worst possible temp.
    if(!weather) {
        logger.info("No weather data for this day, setting max temp to 25C")
        weather = {
            temp: {
                max: 25
            }
        }
    }
    const maxTemp = Math.ceil(weather.temp.max)
    logger.info("Calculating Beer for meetup " + meetupData.name);
    logger.info("attendees: " + attendees);
    logger.info("Max temp: " + maxTemp + "C" );
    //calculate beer.
    let beerTotal;
    //Each person drinks
    if(maxTemp >= 20 && maxTemp <= 24 ) {
        beerTotal = attendees * 1;
    } else if ( maxTemp < 20 ) {
        beerTotal = attendees * 0.75;
    } else {
        beerTotal = attendees * 2
    }
    logger.info(`Total of ${beerTotal} beers`);
    //Return Crates
    let crates = Math.ceil(beerTotal / 6);
    logger.info(`Total of ${crates} crates of beer`);
    return crates;
}

module.exports = {
    calculateBeer
}