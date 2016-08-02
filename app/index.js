'use strict';

// const router = require('express').Router();


//res.render looks into a folder called views so you dont need to explicity say so

// router.get('/', (req,res,next) => {
//   res.render('login');
// })


module.exports = {
  router: require('./routes')(),
  session: require('./session')
}
