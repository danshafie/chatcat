'use strict';

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;


module.exports = () => {
  let authProcesser = (accessToken, refreshToken, profile, done) => {
    // find user in local db in profile.id
    // if user is found, return user data using done()
    // if user is not found, create one in local db and return
  }
  passport.use(new FacebookStrategy(config.fb, authProcesser))
}
