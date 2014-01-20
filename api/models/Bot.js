/**
 * Bot
 *
 * @module      :: Model
 * @description :: A Warp Bot
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  types: {

    sector: function(pos) {
      return 'x' in pos && 'y' in pos;
    },

    // TODO: valider la conformité des actions
    actions: function(arr) {
      return true;
    },

    // TODO: valider la conformité des modules
    modules: function(arr) {
      return true;
    },

  },

  attributes: {
  	
  	sector: {
      type: 'json',
      sector: true
    },

    user: {
      type: 'integer',
      unique: true
    },

    modules: {
      type: 'array',
    },

    // TODO: retourne le pourcentage "d'état" du bot -> HP
    getStatus: function() {

    },

    // TODO: retourne la liste des futures actions du Bot. -> FIFO
    getPendingActions: function() {

    },

    // TODO: retourne la liste des actions disponibles à l'instant donné
    getAvailableActions: function() {

    },

    // TODO: retourne la liste des 10 dernieres actions effectuées. 
    getActionsLog: function() {

    },

    // TODO: ajoute une action à la liste des actions à effectuer
    addAction: function(action) {
      
    }
    
  }

};
