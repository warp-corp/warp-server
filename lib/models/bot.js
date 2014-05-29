var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MAX_SLOTS = 10;

var BotSchema = new Schema({

  user: {
  	type: Schema.Types.ObjectId,
    ref: 'User'
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

  cargo: [{ // Cargaison des ressources
    type: Schema.Types.ObjectId,
    ref: 'ResourceStack'
  }],

  baseMaxCargo: { // Maximum "d'emplacements" de ressources dans la cargaison
    type: Number,
    min: 0,
    default: 10
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

// Validation

BotSchema.path('actions')
  .validate(function(actions) {
    return actions.length <= this.maxActions;
  });

BotSchema.path('slots')
  .validate(function(slots) {
    return slots.length <= this.maxSlots;
  });

BotSchema.path('cargo')
  .validate(function(cargo) {
    return cargo.length <= this.maxCargo;
  });

// Méthodes

// Retourne le modificateur pour une propriété donnée
BotSchema.methods.getModulesMod = function(property) {
  return this.slots.reduce(function(mod, module) {
    return mod + module.getMod(property);
  }, 0);
};

// Propriétés virtuelles

BotSchema // "maxSlots", nombre maximum de module équipés à un instant T
  .virtual('maxSlots')
  .get(function() {
    return MAX_SLOTS;
  });

BotSchema // "maxActions", calculée à partir de la ram
  .virtual('maxActions')
  .get(function() {
    return (this.ram / 64) >> 0;
  });

BotSchema // "maxCargo", maximun de ressources et modules cumulés dans la cargaison à un instant T
  .virtual('maxCargo')
  .get(function() {
    return this.baseMaxCargo + this.getModulesMod('maxCargo');
  });

BotSchema // "ram", calculée à partir de baseRam + modificateurs des modules équipés
  .virtual('ram')
  .get(function() {
    return this.baseRam + this.getModulesMod('ram');
  });

BotSchema // "cpus", calculée à partir de baseCpus + modificateurs des modules équipés
  .virtual('cpus')
  .get(function() {
    return this.baseCpus + this.getModulesMod('cpus');
  });

BotSchema // "shield", calculée à partir de baseShield + modificateurs des modules équipés
  .virtual('shield')
  .get(function() {
    return this.baseShield + this.getModulesMod('shield');
  });


module.exports = mongoose.model('Bot', BotSchema);