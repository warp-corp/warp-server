var passport 			= require('passport')
  , BasicStrategy = require('passport-http').BasicStrategy;
var crypt 				= require("apache-crypt");
var User 					= require('../../models').User;

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!crypt(password, user.password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = passport.authenticate('basic', { session: false });