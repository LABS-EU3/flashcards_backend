/* eslint-disable no-shadow */
require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { findBy, createUser } = require('../resources/auth/model');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_BACKEND_BASEURL,
} = require('../config/index');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${GOOGLE_BACKEND_BASEURL}auth/google/callback`,
    },
    function(accessToken, refreshToken, profile, done) {
      const googleEmail = profile.emails[0].value;
      const encryptedId = bcrypt.hashSync(profile.id, 10);
      findBy({ email: googleEmail })
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            createUser({
              password: encryptedId,
              full_name: profile.displayName,
              email: googleEmail,
            })
              .then(user => {
                done(null, user);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);

module.exports = { Passport: passport };
