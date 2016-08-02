'use strict';

const session = require('express-session');
//passing session to mongo store lets mongo listen to session
//storing the session in cookie in users browser
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');


if(process.env.NODE_ENV === 'production') {
  //initialize session with settings for production
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    //if you dont specify store session will save in memory - this does not scale!
    store: new MongoStore({
      //connect to the Mongoose connection we created in ./db
      mongooseConnection: db.Mongoose.connection
    })
  })
} else {
  //initialize session with setting for development
  module.exports = session({
    secret: config.sessionSecret,
    //default setting for resave is true which constantly queries the db
    resave: false,
    //saved in session store and in broswer even in theres no data
    saveUninitialized: true
  })
}
