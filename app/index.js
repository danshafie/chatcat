'use strict';

// const router = require('express').Router();

require('./auth')();


//create an IO server
let ioServer = app => {
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  //this reads from the session, the empty object is the response that we arent using yet
  io.use((socket, next) => {
    require('./session')(socket.request, {}, next);
  })
  //brings an excutes socket io
  require('./socket')(io, app);
  // returns the server instance because io is locked onto server
  return server;
}

//res.render looks into a folder called views so you dont need to explicity say so

// router.get('/', (req,res,next) => {
//   res.render('login');
// })


module.exports = {
  router: require('./routes')(),
  session: require('./session'),
  ioServer
}
