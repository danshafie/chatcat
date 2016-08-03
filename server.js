'use strict';

const express = require('express');

const app = express();
const chatCat = require('./app');
const passport = require('passport');

//set port to environment port or 3000
app.set('port', process.env.PORT || 3000)

//set the static files for the website
//simple web server that implements streams - thats why you dont need . for link tags
app.use(express.static('public'))

//set view engine to ejs
app.set('view engine', 'ejs');

//chatCat points to the app/index which is exporting everything
//session app.use has to be before router
app.use(chatCat.session)
//initializes with express
app.use(passport.initialize());
// starts session with express
app.use(passport.session());
app.use('/', chatCat.router);



//middleware is used in all routes unless specified
//plug in socketio into application 
chatCat.ioServer(app).listen(app.get('port'), () => {
  console.log('listening on ', app.get('port'));
})
