'use strict';

const h = require('../helpers');
const passport = require('passport');
const config = require('../config');

//these are the routes that are getting used in the recursive function located in app/helpers

module.exports = () => {
  let routes = {
    'get': {
      '/': (req,res,next) => {
        res.render('login');
      },
      //if put in array express allows you to put multiple route handler functions
      //for a given route
      '/rooms': [h.isAuthenticated, (req,res,next) => {
        res.render('rooms', {
          user: req.user,
          host: config.host
        });
      }],
      '/chat': [h.isAuthenticated, (req,res,next) => {
        res.render('chatroom', {
          user: req.user,
          host: config.host
        });
      }],
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/auth/twitter': passport.authenticate('twitter'),
      '/auth/twitter/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/logout': (req,res,next) => {
        // req.logout clears out session and clears req.user
        // req.logout is provided by passport
        req.logout()
        res.redirect('/')
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
