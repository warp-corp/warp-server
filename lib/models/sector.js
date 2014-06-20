/* jshint node: true */
var orm = require('../util/orm');

var Sector = orm.Model.extend({

  tableName: 'sectors',
  hasTimestamps: true,

  // Champs cachés lors de la sérialisation
  hidden: [
    'updated_at', 'created_at',
    'id'
  ],

  bots: function() {
    return this.hasMany('Bot');
  }

});

orm.model('Sector', Sector);

module.exports = Sector;