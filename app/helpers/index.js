'use strict';

const router = require('express').Router();


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


module.exports = {
  route
}
