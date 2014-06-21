/* jshint node: true */
var util = require('util');

var BrokenBotError = function() {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'BrokenBotError';
  this.message = 'Your bot is broken ! Please reset it.';
  this.status = 400;
};

util.inherits(BrokenBotError, Error);

module.exports = BrokenBotError;