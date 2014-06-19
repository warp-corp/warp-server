/* jshint node: true */
var orm = require('../util/orm');

var Resource = orm.Model.extend({

  tableName: 'resources',

  bot: function() {
    return this.belongsTo('Bot');
  }

});

module.exports = Resource;

// "Pile" de ressources
/*var ResourceSchema = new Schema({

  type: { // Type de la ressource
    type: String
  },

  amount: { // Quantité présente dans la pile
    type: Number,
    min: 0,
    default: 0,
    max: 1000
  }

});

module.exports = mongoose.model('ResourceStack', ResourceStackSchema);*/