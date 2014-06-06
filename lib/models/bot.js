/* jshint node: true */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var errors = require('../errors');
var GameStatus = require('./game-status');
var Sector = require('./sectors');

// Contantes & variables globales

// Actions disponibles dans le jeu
var ACTIONS = require('../game/actions'); 
// Actions disponibles par défaut au Bot
var DEFAULT_ACTIONS = ['move'];
var MAX_SLOTS = 10;

// Validation

// Le nombre de modules équipés est il inférieur au nombre max de modules ?
function validateSlots(slots) {
  return slots.length <= this.maxSlots;
}

// Le nombre d'élements dans la cargaison est il bien
// inférieur au maximum autorisé ?
function validateCargo(cargo) {
  return cargo.length <= this.maxCargo;
}

// Schéma

var BotSchema = new Schema({

  coords: { // Coordonnées de la zone courante
  	x: {
      type: Number,
      default: 0
    },
  	y: {
      type: Number,
      default: 0
    }
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  // Hash action:timestamp
  cooldowns: {
    type: Schema.Types.Mixed,
    default: function() {
      return {};
    }
  },

  slots: {

    type: [{ // Emplacements de modules
      type: Schema.Types.ObjectId,
      ref: 'Module'
    }],

    validate: validateSlots

  },
  
  // Cargaison des ressources. Peut contenir des ResourceStack et/ou des Modules
  cargo: {

    type: [{
      type: Schema.Types.ObjectId
    }],

    validate: validateCargo

  },
  
  shield: { // Etat du blindage ( 0%->100% == HP )
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  
  // Caractéristiques de base

  baseMaxCargo: { // Maximum "d'emplacements" de ressources dans la cargaison
    type: Number,
    min: 0,
    default: 10
  },

  baseCpus: { // Nombre de CPUs, rapidité de traitement (== initiative)
    type: Number,
    min: 0,
    default: 5
  },

  baseRam: { // Total de RAM, capacité à programmer des actions
    type: Number,
    default: 128,
    min: 64,
  }

});

// Méthodes

// Retourne le modificateur pour une propriété donnée
BotSchema.methods.getModulesMod = function(property) {
  return this.slots.reduce(function(mod, module) {
    return mod + module.getMod(property);
  }, 0);
};

BotSchema.methods.canDo = function(actionName) {
  return this.availableActions.indexOf(actionName) !== -1;
};

BotSchema.methods.inCooldown = function(actionName) {

  var actionLogic = ACTIONS[actionName];

  if(!actionLogic) {
    throw new errors.UnknownAction(actionName);
  }

  if(actionName in this.cooldowns) {
    return this.cooldowns[actionName] + actionLogic.cooldown >= Date.now();
  }

  return false;

};

BotSchema.methods.refreshCooldown = function(actionName, cb) {
  this.cooldowns[actionName] = Date.now();
  this.markModified('cooldowns');
  this.save(cb);
  return this;
};

// Configuration par défaut

BotSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, obj) {
    delete obj._id;
    delete obj.__v;
    delete obj.baseCpus;
    delete obj.baseRam;
    delete obj.baseMaxCargo;
  }
});

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

// "maxCargo", maximun de ressources et modules cumulés
// dans la cargaison à un instant T
BotSchema 
  .virtual('maxCargo')
  .get(function() {
    return this.baseMaxCargo + this.getModulesMod('maxCargo');
  });

// "ram", calculée à partir de baseRam + modificateurs des modules équipés
BotSchema 
  .virtual('ram')
  .get(function() {
    return this.baseRam + this.getModulesMod('ram');
  });

// "cpus", calculée à partir de baseCpus + modificateurs des modules équipés
BotSchema
  .virtual('cpus')
  .get(function() {
    return this.baseCpus + this.getModulesMod('cpus');
  });

// "availableActions", actions utilisables par le Bot"
BotSchema 
  .virtual('availableActions')
  .get(function() {
    return this.slots.reduce(function(actions, module) {
      var newActions = module.actions.filter(function(actionName) {
        return actions.indexOf(actionName) === -1;
      });
      actions.push.apply(actions, newActions);
      return actions;
    },  DEFAULT_ACTIONS);
  });

module.exports = mongoose.model('Bot', BotSchema);