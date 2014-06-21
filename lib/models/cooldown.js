var orm = require('../util/orm');
var config = require('../util/config');

var ACTIONS = require('../game/actions');
var COOLDOWN_MULTIPLIER = config.get('game:cooldownMultiplier');

var Cooldown = orm.Model.extend({

  tableName: 'cooldowns',

  hidden: ['id', 'bot_id', 'timestamp'],

  virtuals: {
    next_time_available: function() {
      var ts = this.get('timestamp');
      var cooldown = ACTIONS[this.get('action')].cooldown;
      return new Date(ts + (cooldown * COOLDOWN_MULTIPLIER));
    }
  },

  bot: function() {
    return this.belongsTo('Bot');
  }

});

orm.model('Cooldown', Cooldown);

module.exports = Cooldown;