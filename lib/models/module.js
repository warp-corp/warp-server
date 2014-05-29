var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModuleSchema = new Schema({

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

  }

});

ModuleSchema.methods.getMod = function(property) {
  var mod = this.mods[property];
  return mod ? mod : 0;
};

module.exports = mongoose.model('Module', ModuleSchema);