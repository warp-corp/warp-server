var restify = require('restify');
var User = require('../../models/user');

module.exports = function basicAuthMiddleware(req, res, next) {

  var auth = req.authorization;

  if(auth && auth.basic) {
    var username = auth.basic.username;
    var password = auth.basic.password;
  } else {
    return next(new restify.NotAuthorizedError());
  }

};