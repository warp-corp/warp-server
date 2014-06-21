/* jshint node: true */
var orm = require('../util/orm');

var Sector = orm.Model.extend({

  tableName: 'sectors',
  hasTimestamps: true,

  // Champs cachés lors de la sérialisation
  hidden: [
    'updated_at', 'created_at',
    'id', 'special_actions', 'banned_actions'
  ],

  bots: function() {
    return this.hasMany('Bot');
  },

  // Méthodes

  distanceTo: function(sector) {
    return Math.sqrt(
      ( sector.get('x')*sector.get('x')-this.get('x')*this.get('x') ) +
      ( sector.get('y')*sector.get('y')-this.get('y')*this.get('y') )
    );
  }

});

orm.model('Sector', Sector);

module.exports = Sector;