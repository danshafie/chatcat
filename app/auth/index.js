'use strict';

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const h = require('../helpers');

module.exports = () => {
  let authProcessor = (accessToken, refreshToken, profile, done) => {
    // find user in local db in profile.id
    h.findOne(profile.id)
      .then(result => {
        if(result) {
          done(null, result)
        } else {
          // create a new user and return
          h.createChatUser(profile)
            .then(newChatUser => done(null, newChatUser))
            .catch(error => console.log('Error creating new user ', error))
        }
      })
    // if user is found, return user data using done()
    // if user is not found, create one in local db and return
  }
  passport.use(new FacebookStrategy(config.fb, authProcessor))
}
