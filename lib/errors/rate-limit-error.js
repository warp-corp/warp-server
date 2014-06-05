/* jshint node: true */
var util = require('util');

var RateLimitError = function() {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'RateLimitError';
  this.message = 'Too many request !';
  this.status = 429;
};

util.inherits(RateLimitError, Error);

module.exports = RateLimitError;