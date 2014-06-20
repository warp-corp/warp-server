var orm = require('../util/orm');

var Cooldown = orm.Model.extend({

  tableName: 'cooldowns',

  hidden: ['id', 'bot_id'],

  bot: function() {
    return this.belongsTo('Bot');
  }

});

orm.model('Cooldown', Cooldown);

module.exports = Cooldown;