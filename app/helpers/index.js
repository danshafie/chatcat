'use strict';

const router = require('express').Router();
const db = require('../db');


//recursive function to iterate through the routes object and mount the routes
let _registerRoutes = (routes, method) => {
  for(let key in routes) {
    if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
      _registerRoutes(routes[key], key);
    } else {
      // Register the routes
      if(method === 'get') {
        router.get(key, routes[key])
      } else if(method === 'post') {
        router.post(key, routes[key])
      } else {
        //routes it in order so the 404 registers last.
        router.use(routes[key]);
      }
    }
  }
}


let route = routes => {
  _registerRoutes(routes);
  return router;
}

//find a single user based on a key
let findOne = profileId => {
  return db.userModel.findOne({
    'profileId': profileId
  })
}

let createChatUser = profile => {
  return new Promise((resolve, reject) => {
    let newChatUser = db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    })

    newChatUser.save(error => {
      if(error) {
        console.log('error saving user in db ', error);
        reject(error);
      } else {
        resolve(newChatUser)
      }
    })
  })
}

//es6 promise version of findById
let findById = id => {
  return new Promise((resolve,reject) => {
    db.userModel.findById(id, (error, user) => {
      if(error) {
        reject(error);
      } else {
        resolve(user);
      }
    })
  })
}

//middleware that checks to see if user is authenticated and logged in
let isAuthenticated = (req,res,next) => {
  //isAuthenticated is provided by passport
  if(req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/')
  }
}


module.exports = {
  route,
  findOne,
  createChatUser,
  findById,
  isAuthenticated
}
