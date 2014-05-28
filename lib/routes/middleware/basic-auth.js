var passport 			= require('passport')
  , BasicStrategy = require('passport-http').BasicStrategy
  , crypt 				= require("apache-crypt")
  , User 					= require('../../models').User;

passport.use(new BasicStrategy(
  function(username, password, done) {
  	console.log(password);
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!(crypt(password, user.password) == user.password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = passport.authenticate('basic', { session: false });