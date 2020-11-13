const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require("../models/User");
const logger = require("../utils/logger")(module);

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        res.redirect('login');
    }
  }


  const isLoggedInAndAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(404).send("No se encontró :(");
    }
  }

  router.get("/protectedAdmin", isLoggedInAndAdmin, (req, res) => {
    res.send("logged admin");
})


 router.get("/protected", isLoggedIn, (req, res) => {
     res.send("logged");
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
         return res.json(user);
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
        res.send("Usuario registrado correctamente");        
      } catch (err) {
          logger.error(err.message);
          res.status(500).send('server error');
      }
  
    }
  );
  

module.exports = router;