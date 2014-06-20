/* jshint node: true */
var util = require('util');

var InvalidDirectionError = function(direction) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'InvalidDirectionError';
  this.message = 'Invalid direction "' + direction + '" !';
  this.status = 400;
};

util.inherits(InvalidDirectionError, Error);

module.exports = InvalidDirectionError;