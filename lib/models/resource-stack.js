/* jshint node: true */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// "Pile" de ressources
var ResourceStackSchema = new Schema({

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

module.exports = mongoose.model('ResourceStack', ResourceStackSchema);