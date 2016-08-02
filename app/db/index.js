'use strict';

//require config so we can see which environment were running in
const config = require('./config');
//connect to mongo db depending on which environment youre running
const Mongoose = require('mongoose').connect(config.dbURI);


//if there is an error on connection - log it out
Mongoose.connection.on('error', error => {
  console.log('MongoDB error: ', error);
})

module.exports = {
  Mongoose
}
