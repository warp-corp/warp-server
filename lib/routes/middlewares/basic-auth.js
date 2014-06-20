var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy
var User = require('../../models/user');

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.login(username, password)
      .then(done.bind(null, null))
      .catch(done);
  }
));

module.exports = passport.authenticate('basic', { session: false });