/* jshint node: true */
var util = require('util');

var UnauthorizedActionError = function(actionName) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnauthorizedActionError';
  this.message = 'Unauthorized action ' + actionName + '!';
  this.status = 400;
};

util.inherits(UnauthorizedActionError, Error);

module.exports = UnauthorizedActionError;