/* jshint node: true */
var orm = require('../util/orm');

var Sector = orm.Model.extend({

  tableName: 'sectors',

  bots: function() {
    return this.hasMany('Bot');
  }

});


/*
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
  	var carX = (this.coords.x * this.coords.x);
  	var carY = (this.coords.y * this.coords.y);
    return Math.sqrt(carX + carY).toFixed(3);
  });


module.exports = mongoose.model('Sector', SectorSchema);*/