const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require("../models/User");
const logger = require("../utils/logger")(module);
const {isLoggedIn, isLoggedInAndAdmin} = require("../controller/auth.controller");
const notificationController = require('../controller/notification.controller');


router.get("/protectedAdmin", isLoggedInAndAdmin, (req, res) => {
    res.send("logged admin");
})

router.get("/protected", isLoggedIn, (req, res) => {
     res.send(true);
})

router.get("/login", (req, res) => {
     res.status(200).send("Por favor Logueate");
})

//Login Route
  router.post('/login', (req, res, next) => {
     passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      
      if (!user) {
        return res.status(400).json({
            message: 'Usuario o Contraseña incorecta'    
        });}
    
        req.login(user, (err) => {
         if (err) {
             res.send(err);
         }
         logger.info("User Correctly logged in.")
         return res.status(200).send({
           user: user.email,
           name: user.name,
           id: user._id,
           isAdmin: user.isAdmin
         });
      });

})(req, res, next)});

//Register Route
router.post(
    "/register",
    [
      check("name", "El nombre es obligatorio")
        .not()
        .isEmpty(),
      check("email", "Por favor ingresa un email valido").isEmail(),
      check(
        "password",
        "Por favor ingresa una contraseña de al menos 6 caracteres"
      ).isLength({ min: 6 })
    ],
    async (req, res) => {
      
      //errors array
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
      }
      //destructure
      const { name, email, password, password2 } = req.body;
      
      try {
        //check if user exists
        let user = await User.findOne({email});
        //If exists:
        if (user) {
            return  res.status(400).json({errors:[{msg: 'El usuario ya existe' }]});
            }
        //If Passwords do not match
        if (password !== password2) {
            return res.status(400).json({errors:[{msg: "Las contraseñas no coinciden"}]});
        }
        user = new User({
            name, 
            email,
            password,
            isAdmin: false
        });
    
        //Bcrypt salt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        //Save User.
        await user.save();
        console.log(user);
        logger.info("User Correctly registered")
        res.send({
          email: user.email,
          name: user.name,
          id: user._id,
          isAdmin: user.isAdmin
        });        
      } catch (err) {
          logger.error(err.message);
          res.status(500).send('server error');
      }
  
    }
  );

  router.get('/logout',(req,res) => {
    console.log(req.user);
    logger.info("Logging out user: " + req.user);
    req.session.destroy((err) => {
        if(err) {
          logger.error(error);
          res.status(500).send(err)
        }
        req.logout();
        res.status(200).send("Logout correcto :)")
    });})


router.get("/notification", isLoggedIn, async (req,res) => {
  try {
    console.log(req.user_id);
    const data = await notificationController.getNotifications(req.user._id)
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.get("/readNotifications", isLoggedIn, async (req,res) => {
  try {
    console.log(req.user_id);
    const data = await notificationController.readNotifications(req.user._id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
})
  
  
module.exports = router;