/* jshint node: true */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schéma
var SectorSchema = new Schema({
  
  // coordonnées du secteur
	coords: {
		x: {
			type: Number,
		  default: 0
		}, 
		y: {
			type: Number,
			default: 0
		}
	},

	// type du secteur
	type: {
		type: String,
		default: 'plaine'
	},

	// combat autorisé ou non
	authorized_fight : {
		type: Boolean,
		default: false
	}

});

SectorSchema.set('toJSON', {
  virtuals: true
});

// Propriété virtuelle
// 
SectorSchema // "toOrigin", distance du secteur courant à l'origine
  .virtual('toOrigin')
  .get(function() {
    return Math.sqrt(this.coords.x + this.coords.y);
  });


module.exports = mongoose.model('Sector', SectorSchema);