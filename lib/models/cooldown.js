var orm = require('../util/orm');
var ACTIONS = require('../game/actions');

var Cooldown = orm.Model.extend({

  tableName: 'cooldowns',

  hidden: ['id', 'bot_id', 'timestamp'],

  virtuals: {
    next_time_available: function() {
      var ts = this.get('timestamp');
      var cooldown = ACTIONS[this.get('action')].cooldown;
      return new Date(ts + cooldown);
    }
  },

  bot: function() {
    return this.belongsTo('Bot');
  }

});

orm.model('Cooldown', Cooldown);

module.exports = Cooldown;