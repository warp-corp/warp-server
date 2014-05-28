var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MAX_SLOTS = 10;

var BotSchema = new Schema({

  user: {
  	type: Schema.Types.ObjectId,
    ref: 'Player'
  },

  coords: { // Coordonnées de la zone courante
  	x: Number,
  	y: Number
  },

  slots: [{ // Emplacements de modules
    type: Schema.Types.ObjectId,
    ref: 'Module'
  }],

  actions: [{ // Pile d'actions
    type: Schema.Types.ObjectId,
    ref: 'Action'
  }],

  capacity: { // Capacité de stockage des ressources
    type: Number,
    min: 0
    default: 100
  },

  baseShield: { // Etat du blindage (== HP)
    type: Number,
    min: 0,
    default: 50
  },

  baseCpus: { // Nombre de CPUs, rapidité de traitement (== initiative)
    type: Number,
    min: 0,
    default: 50
  },

  baseRam: { // Total de RAM, capacité à programmer des actions
    type: Number,
    default: 128,
    min: 64,
  }

});

BotSchema.methods.getModulesMod = function(field) {
  // TODO:  le modificateur de caractéristique apporté par les modules
  return 0;
};

// Retourne le maximum d'actions dans la pile à un instant donné
BotSchema.methods.getMaxActions = function() {
  return (this.ram / 64) >> 0;
};

// Retourne le maximum de modules équipés à un instant donné
BotSchema.methods.getMaxSlots = function() {
  return MAX_SLOTS;
};

BotSchema // Propriété virtuelle "ram", calculée à partir de baseRam + modificateurs des modules équipés
  .virtual('ram')
  .get(function() {
    return this.baseMemory + this.getModulesMod('ram');
  });

BotSchema // Propriété virtuelle "cpus", calculée à partir de baseCpus + modificateurs des modules équipés
  .virtual('cpus')
  .get(function() {
    return this.baseCpus + this.getModulesMod('cpus');
  });

BotSchema // Propriété virtuelle "shield", calculée à partir de baseShield + modificateurs des modules équipés
  .virtual('shield')
  .get(function() {
    return this.baseShield + this.getModulesMod('shield');
  });


module.exports = mongoose.model('Bot', BotSchema);