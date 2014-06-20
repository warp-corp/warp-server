/* jshint node: true */
var orm = require('../util/orm');

var Resource = orm.Model.extend({

  tableName: 'resources',
  hasTimestamps: true,

  bot: function() {
    return this.belongsTo('Bot');
  }

});

orm.model('Resource', Resource);

module.exports = Resource;