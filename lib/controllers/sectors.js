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