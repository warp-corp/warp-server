/* jshint node: true */
var orm = require('../util/orm');
//var AVAILABLE_ACTIONS = require('../game/actions');

var Module = orm.Model.extend({

  tableName: 'modules',
  hasTimestamps: true,

  bot: function() {
    return this.belongsTo('Bot');
  },

  // Méthodes

  getMod: function(field) {
    return this.get(field) || 0;
  }

});

orm.model('Module', Module);

module.exports = Module;