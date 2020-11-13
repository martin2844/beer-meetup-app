const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        //If no user was found.
        if (!user) {
          return done(null, false, { message: 'Este email no está registrado' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {console.log(err)};
          if (isMatch) {
            return done(null, user);  
          } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }

        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

