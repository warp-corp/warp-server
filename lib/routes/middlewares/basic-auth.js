var restify = require('restify');
var User = require('../../models/user');
var Logger = require('../../util/logger');

module.exports = function basicAuthMiddleware(req, res, next) {

  var auth = req.authorization;

  if(auth && auth.basic) {

    var username = auth.basic.username;
    var password = auth.basic.password;

    User.authenticate(username, password, function(err, user) {

      if(err) {
        logger.error(err);
        return next(new restify.InternalError());
      }

      if(user) {
        req.user = user;
        return next();
      } else {
        return next(new restify.NotAuthorizedError());
      }

    });

  } else {
    return next(new restify.NotAuthorizedError());
  }

};