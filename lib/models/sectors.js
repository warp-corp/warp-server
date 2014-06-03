/* jshint node: true */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schéma
var SectorSchema = new Schema({
  
  // coordonnées du secteur
	coords: {
		x: {
			type: Number,
		  require: true
		}, 
		y: {
			type: Number,
			require: true
		}
	},

	// type du secteur
	type: {
		type: String,
		default: 'plaine'
	}

});

module.exports = mongoose.model('Sector', SectorSchema);