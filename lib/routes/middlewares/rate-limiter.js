/* jshint node: true */
var RateLimiter = require('limiter').RateLimiter;
var config = require('../../util/config');
var RateLimitError = require('../../errors/rate-limit-error');

var settings = config.get('rateLimit');

var limiters = {};

module.exports = function rateLimiter(req, res, next) {

  var limiter = limiters[req.user._id];

  if(!limiter) {
    limiter = new RateLimiter(settings.rate, settings.every, true);
    limiters[req.user._id] = limiter;
  }

  limiter.removeTokens(1, function(err, remaining) {

    if(err) {
      return next(err);
    }

    if(remaining < 0) {
      return next(new RateLimitError());
    } else {
      return next();
    }
    
  });

};