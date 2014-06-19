/* jshint node: true */
var orm = require('../util/orm');
//var AVAILABLE_ACTIONS = require('../game/actions');

var Module = orm.Model.extend({

  tableName: 'modules',

  bot: function() {
    return this.belongsTo('Bot');
  }

});

module.exports = Module;

/*var ModuleSchema = new Schema({

  name: {
    type: String
  },

  mods: {

    maxCargo: {
      type: Number,
      min: 0,
      default: 0
    },

    ram: {
      type: Number,
      min: 0,
      default: 0
    },

    cpus: {
      type: Number,
      min: 0,
      default: 0
    },

    shield: {
      type: Number,
      min: 0,
      default: 0
    }

  },

  actions: [{
    type: String,
    enum: {
      values: Object.keys(AVAILABLE_ACTIONS),
      message: 'Invalid action name `{VALUE}` !'
    }
  }]

});

ModuleSchema.methods.getMod = function(property) {
  var mod = this.mods[property];
  return mod ? mod : 0;
};

module.exports = mongoose.model('Module', ModuleSchema);*/