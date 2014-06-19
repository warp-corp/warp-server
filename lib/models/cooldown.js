var orm = require('../util/orm');

var Cooldown = orm.Model.extend({

  tableName: 'cooldowns',

  bot: function() {
    return this.belongsTo('Bot');
  }

});

module.exports = Cooldown;