'use strict';


module.exports = (io, app) => {
  let allrooms = app.locals.chatrooms;
  //io.of means were listening to the socket.io pipeline in our connection
  io.of('/roomslist').on('connection', socket => {
    console.log('socket io connected to client!');
  })
}
