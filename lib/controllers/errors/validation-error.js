/* jshint node: true */
var util = require('util');

var ValidationError = function(error) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'ValidationError';
  this.message = 'Invalid input data !';
  this.status = 400;
  this.originalError = error;
};

util.inherits(ValidationError, Error);

module.exports = ValidationError;