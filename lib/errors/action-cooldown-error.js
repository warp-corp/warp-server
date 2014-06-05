/* jshint node: true */
var util = require('util');

var ActionCooldownError = function(actionName) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'ActionCooldownError';
  this.message = 'Cannot execute action ' + actionName + ' now !';
  this.status = 429;
};

util.inherits(ActionCooldownError, Error);

module.exports = ActionCooldownError;