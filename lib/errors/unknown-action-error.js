/* jshint node: true */
var util = require('util');

var UnknownActionError = function(actionName) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnknownActionError';
  this.message = 'Unknown action ' + actionName + '!';
  this.status = 400;
};

util.inherits(UnknownActionError, Error);

module.exports = UnknownActionError;