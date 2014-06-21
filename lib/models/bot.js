/* jshint node: true */
var orm = require('../util/orm');
var errors = require('../errors');
var config = require('../util/config');
var _ = require('lodash');
var Promise = require('bluebird');

// Contantes & variables globales

var ACTIONS = require('../game/actions');
var DEFAULT_ACTIONS = config.get('game:defaultActions');
var MAX_SLOTS = config.get('game:maxSlots');
var COOLDOWN_MULTIPLIER = config.get('game:cooldownMultiplier');

var Bot = orm.Model.extend({

  tableName: 'bots',
  hasTimestamps: true,

  // Champs cachés lors de la sérialisation
  hidden: [
    'updated_at', 'created_at',
    'base_cpus', 'base_ram', 'base_max_hp',
    'base_max_cargo', 'base_armoring',
    'sector_id', 'user_id'
  ],

  // Valeurs par défaut

  defaults: {
    sector_id: 0
  },

  // Champs virtuels

  virtuals: {

    cpus: function() {
      return this.get('base_cpus') + this.getModulesMod('cpus');
    },

    ram: function() {
      return this.get('base_ram') + this.getModulesMod('ram');
    },

    integrity: function() {
      return +(this.get('hp') / this.get('max_hp') * 100).toFixed(2);
    },

    armoring: function() {
      return this.get('base_armoring') + this.getModulesMod('armoring');
    },

    max_hp: function() {
      return this.get('base_max_hp') + this.getModulesMod('max_hp');
    },

    max_actions: function() {
      return (this.get('ram') / 64) >> 0;
    },

    max_slots: function() {
      return MAX_SLOTS;
    },

    max_cargo: function() {
      return this.get('base_max_cargo') + this.getModulesMod('max_cargo');
    },

    available_actions: function() {

      // On récupère les actions ajoutées par les modules équipés
      var availableActions = this.related('slots').reduce(function(actions, module) {

        var newActions = module.actions.filter(function(actionName) {
          return actions.indexOf(actionName) === -1;
        });

        actions.push.apply(actions, newActions);

        return actions;

      }, DEFAULT_ACTIONS.slice());

      // On ajoute les actions "spéciales" ajoutées par le secteur courant
      availableActions = (this.related('sector').get('special_actions') || '').split(',').reduce(function(actions, actionName) {
        if(actionName && actions.indexOf(actionName) === -1) {
          actions.push(actionName);
        }
        return actions;
      }, availableActions);

      // On retire les actions bannies par le secteur
      var bannedActions = (this.related('sector').get('banned_actions') || '').split(',');
      return availableActions.filter(function(actionName) {
        return bannedActions.indexOf(actionName) === -1;
      });

    }

  },

  // Relations

  sector: function() {
    return this.belongsTo('Sector');
  },

  user: function() {
    return this.belongsTo('User');
  },

  cooldowns: function() {
    return this.hasMany('Cooldown');
  },

  slots: function() {
    return this.hasMany('Module');
  },

  cargo: function() {
    return this.hasMany('Resource');
  },

  // Méthodes

  canDo: function(actionName) {
    return this.get('available_actions').indexOf(actionName) !== -1;
  },

  // Vérifie si l'action donnée est encore en cooldown. Retourne une Promise
  inCooldown: function(actionName) {

    var self = this;
    var actionLogic = ACTIONS[actionName];

    if(!actionLogic) {
      throw new errors.UnknownAction(actionName);
    }

    return orm.model('Cooldown')
      .query(function(query) {
        query.where({'bot_id': self.id, action: actionName})
          .whereRaw('timestamp + ? >= ?', [
            actionLogic.cooldown * COOLDOWN_MULTIPLIER,
            Date.now()
          ]);
      })
      .fetch()
      .then(function(cooldown) {
        return !!cooldown;
      });

  },

  refreshCooldown: function(actionName) {
    var Cooldown = orm.model('Cooldown');
    return Cooldown
      .where({'bot_id': this.id, action: actionName})
      .fetch()
      .bind(this)
      .then(function(cooldown) {

        // Si le Cooldown n'existe pas, on en créait un nouveau
        if(!cooldown) {
          return new Cooldown({
            action: actionName,
            timestamp: new Date(),
            'bot_id': this.id
          }).save();
        } else {
          // Sinon on met à jour son timestamp
          return cooldown.save({
            timestamp: new Date()
          }, { patch: true });
        }

      });
  },

  // Retourne les modificateurs de caractéristiques apportés par les modules équipés sur le Bot
  getModulesMod: function(field) {

    return this.related('slots').reduce(function(mod, module) {
      return mod + module.getMod(field);
    }, 0);

  },

  // Fait executer l'action au bot
  execute: function(actionName, params) {

    // On récupère la "logique" de l'action
    var actionLogic = ACTIONS[actionName];

    if(this.get('hp') <= 0) {
      return Promise.reject(new errors.BrokenBotError());
    }

    // Si l'action n'existe pas, on arrête ici
    if(!actionLogic) {
      return Promise.reject(new errors.ActionCooldownError(actionName))
    }

    if(!this.canDo(actionName)) {
      return Promise.reject(new errors.UnauthorizedActionError(actionName));
    }

    return this.inCooldown(actionName)
      .bind(this)
      .then(function(inCooldown) {
        if(inCooldown) {
          throw new errors.ActionCooldownError(actionName);
        }
      })
      .then(function() {
        return this.refreshCooldown(actionName);
      })
      .then(function() {
        return actionLogic.execute(this, params || {});
      });
  },

  applyDamages: function(dmg, opts) {

    opts = opts || {};

    return this.fetch(_.extend(_.clone(opts), {
        withRelated: ['slots', 'sector']
      }))
      .bind(this)
      .then(function(){

        var armoring = this.get('armoring');
        var hp = this.get('hp');

        dmg = dmg > armoring ? dmg - armoring : 0;

        return this.save(
          { hp: hp-dmg > 0 ? hp-dmg : 0 },
          _.extend(_.clone(opts), {
            patch: true
          }
        ));

      });

  },

});

orm.model('Bot', Bot);

module.exports = Bot;