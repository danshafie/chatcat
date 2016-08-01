'use strict';

const h = require('../helpers');

//these are the routes that are getting used in the recursive function located in app/helpers

module.exports = () => {
  let routes = {
    'get': {
      '/': (req,res,next) => {
        res.render('login');
      },
      '/rooms': (req,res,next) => {
        res.render('rooms');
      },
      '/chat': (req,res,next) => {
        res.render('chatroom');
      }
    },
    'post': {

    },
    'NA': (req,res,next) => {
      //process.cwd always go to folder where the server.js file is
      res.status(404).sendFile(process.cwd() + '/views/404.htm');
    }
  }


  return h.route(routes);
}
