'use strict';

if(process.env.NODE_ENV === 'production') {
  //offer production stage env variables
  module.exports = {
    host: process.env.host || "",
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    fb: {
      clientId: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callbackURL: process.env.host + '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos']
    },
    twitter: {
      consumerKey: process.env.twConsumerKey,
      consumerSecret: process.env.twConsumerSecret,
      callbackUrl: process.env.host + '/auth/twitter/callback',
      profileFields: ['id', 'displayName', 'photos']
    }
  }
} else {
  module.exports = require('./development.json');
}
