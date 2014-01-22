var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registeredActions = [];

var ActionSchema = new Schema({

  name: {
    type: String
  },

  params : {
    type: Schema.Types.Mixed
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
  return registeredActions.some(function(action) {
    return name === action.name;
  });
}

ActionSchema
  .path('name')
  .validate(validateActionName, 'Not a valid action !');

ActionSchema.statics.registerAction = function(action) {
  registeredActions.push(action);
};

module.exports = mongoose.model('Action', ActionSchema);