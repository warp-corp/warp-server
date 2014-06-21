/* jshint node: true */
var util = require('util');

var UnreachableTargetError = function(targetId, maxDistance) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnreachableTargetError';
  this.message = 'Target Bot(' + targetId + ') is too far ! (max: ' + maxDistance + ')';
  this.status = 400;
};

util.inherits(UnreachableTargetError, Error);

module.exports = UnreachableTargetError;