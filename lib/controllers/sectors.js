/* jshint node: true */
var mongoose = require('mongoose');

// Renvoi le secteur où se situe le robot de l'utilisateur courant
exports.getCurrent = function(req, res, next) {
	var Sector = mongoose.model('Sector');
	var BotCoords = req.bot.coords;

	var conditions = {
		"coords.x": BotCoords.x,
		"coords.y": BotCoords.y
	};

  Sector.findOne(conditions, function(err, sector) {
  	if (err)
  		return next(err);

  	res.send(sector);
  });
};

// Initialise les secteurs en créant le secteur Origine [0,0]
// Test si le secteur Origin existe déjà, 
// 	- si NON alors on le créé
// 	- si OUI on fait rien
exports.bootstrap = function(req, res, next) {
	var Sector = mongoose.model('Sector');
	
	var cond = {
		"coords.x": 0,
		"coords.y": 0
	};

	Sector.findOne(cond, function(err, sector) {
		if (err)
			return next(err);

		// Création du secteur origine
		if (sector == null) {
			var Origin = new Sector();
			Origin.save(function(err) {
				if (err)
					return next(err);
			});

			sector = Origin;
		}

		return res.send(sector);

	});
};