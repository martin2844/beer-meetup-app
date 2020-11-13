const express = require("express");
const router = express.Router();
const {isLoggedIn, isLoggedInAndAdmin} = require("../controller/auth.controller");
const meetupController = require("../controller/meetup.controller");
const logger = require("../utils/logger")(module);


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

router.post("/attend/:id", isLoggedIn, async (req, res) => {
    const meetupID = req.params.id;
    try {
       await meetupController.addAttendee(meetupID, req.user._id);
       res.status(200).send("Se te agregó correctamente como participante del evento")
    } catch (error) {
        res.status(500).send(error);
    }
   

});

router.post("/checkin/:id", isLoggedIn, async (req, res) => {
    const meetupID = req.params.id;
    try {
        await meetupController.checkIn(meetupID, req.user._id);
        res.status(200).send("Se te registró correctamente en el meetup. Gracias por asistir")
     } catch (error) {
         res.status(500).send(error);
     }

});


module.exports = router;