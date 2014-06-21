/* jshint node: true */
var util = require('util');

var UnknownBotTargetError = function(targetId) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnknownBotTargetError';
  this.message = 'Unknown target Bot(' + targetId + ') !';
  this.status = 400;
};

util.inherits(UnknownBotTargetError, Error);

module.exports = UnknownBotTargetError;