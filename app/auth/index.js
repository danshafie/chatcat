'use strict';

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const h = require('../helpers');

module.exports = () => {

  //serializeUser is invoked when authorize aka authProcessor ends
  //invoking done and passing user.id makes session and stores user.id in session
  //user.id is from the db not the facebook id
  passport.serializeUser((user, done) => {
    done(null,user.id);
  })

  //this comes back as req.user
  passport.deserializeUser((id, done) => {
    h.findById(id)
      .then(user => done(null, user))
      .catch(error => console.log('Error when deserializing user ', error))
  })

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
  passport.use(new FacebookStrategy(config.fb, authProcessor));
  passport.use(new TwitterStrategy(config.twitter, authProcessor));
}
