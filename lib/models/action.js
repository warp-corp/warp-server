var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registeredActions = {};

var ActionSchema = new Schema({

  name: {
    type: String
  },

  bot: {
    type: Schema.Types.ObjectId,
    ref: 'Bot'
  },

  turn: {
    type: Number
  }

});

function validateActionName(name) {
  return name in registeredActions;
}

ActionSchema
  .path('name')
  .validate(validateActionName, 'Not a valid action !');

ActionSchema.statics.register = function(actionName, func) {
  registeredActions[actionName] = func;
};

ActionSchema.methods.execute = function(params, cb) {
  // TODO Vérifier la validité de l'action
};

module.exports = mongoose.model('Action', ActionSchema);