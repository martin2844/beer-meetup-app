const express = require("express");
const router = express.Router();
const {isLoggedIn, isLoggedInAndAdmin} = require("../controller/auth.controller");
const meetupController = require("../controller/meetup.controller");
const logger = require("../utils/logger")(module);
const beerController = require("../controller/beer.controller");
const weatherDate = require('../utils/weatherDate');
const weatherController = require("../controller/weather.controller");

//Create Meetup
router.post("/create", isLoggedInAndAdmin, async (req, res) => {
    let {name, date} = req.body;
    //Date manipulation for it to be a correct format for our schema
    date = date.split(' ');
    let date1 = date[0].split(/\//);
    let time = date[1];
    let newDate = date1[1] + '/' + date1[0] + '/' + date1[2] + ' ' + time;
    var formatedDate = new Date(newDate);

    let meetupData = {
        name,
        date: formatedDate,
        owner: req.user._id,
        attendees: [req.user._id]
    }
    try {
        const newMeetup = await meetupController.createMeetup(meetupData)
        res.status(200).send(newMeetup);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete meetup by ID
router.delete("/delete/:id", isLoggedInAndAdmin, async (req, res) => {
    const meetupID = req.params.id;
    try {
        let deleted = await meetupController.deleteMeetup(meetupID);
        if(deleted) {
            res.status(200).send("Meetup borrada exitosamente");
        } else {
            res.status(404).send("No se encontró la Meetup");
        }
        
    } catch (error) {
        res.status(500).send("error borrando meetup")
    }
})

//Register as attendee
router.post("/attend/:id", isLoggedIn, async (req, res) => {
    const meetupID = req.params.id;
    try {
       await meetupController.addAttendee(meetupID, req.user._id);
       res.status(200).send("Se te agregó correctamente como participante del evento")
    } catch (error) {
        res.status(500).send(error);
    }
   

});

//Check in in meetup
router.post("/checkin/:id", isLoggedIn, async (req, res) => {
    const meetupID = req.params.id;
    try {
        await meetupController.checkIn(meetupID, req.user._id);
        res.status(200).send("Se te registró correctamente en el meetup. Gracias por asistir")
     } catch (error) {
         res.status(500).send(error);
     }

});

//Get beer amounts for meetup with ID
router.get("/beerAmounts/:id", isLoggedInAndAdmin, async (req, res) => {
    try {
        const meetupID = req.params.id;
        const beerAmount = await beerController.calculateBeer(meetupID);
        res.status(200).send(beerAmount.toString());
    } catch (error) {
        res.status(500).send(error);
    }
  
})

//Check weather for meetup with id
router.get("/checkWeather/:id", isLoggedIn, async (req, res) => {
    try {
        const meetupID = req.params.id;
        const meetupData = await meetupController.getMeetup(meetupID);
        if(!meetupData) {
            res.status(404).send("No existe esta meetup");
            return;
        }
        const date = weatherDate(meetupData.date);
        const forecast = await weatherController.getWeatherFor(date);
        if(!forecast){
            res.status(206).send("No hay info sobre el clima para esa fecha")
        } else {
            res.status(200).send(forecast.temp.max.toString());
        }   
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.get("/getAll", async (req, res) => {
    try {
        const meetups = await meetupController.getAllMeetups();
        res.status(200).send(meetups);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;