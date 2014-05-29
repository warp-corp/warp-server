
var User  = require('../models').User;
var Bot 	= require('../models').Bot;
var user 	= new User();
var crypt = require("apache-crypt");

// Renvoi les informations de l'utilisateur courant
//
exports.getInfo = function(req, res) {
	var username = req.user.name;
  User.findOne({ name: username }, function (err, user) {
    if (err) { return console.log(err); }
    if (!user) { return res.redirect('/notfound'); }
    res.send(user.toJSON({hide: 'password'}));
  });
};

// Enregistrement d'un nouveau joueur
// TODO:
//  - Vérification de la validité des données
//  
exports.register = function(req, res) {
  var nBot = new Bot();

	user.name = req.param('username');
	user.password = crypt(req.param('pwd'));
	user.email = req.param('email');
  user.bot = nBot;
  nBot.player = user;
  
	user.save( function (err) {
    if (err) 
    	return res.send(err);

    console.log("New user: " + user.name + ' with bot ' + user.bot)
    res.redirect('/users/');
  });
};

// Suppression d'un compte
// 
exports.erase = function(req, res) {
	var username = req.param('user');
  User.remove({ name: username }, function (err) {
	  if (err) return console.log(err);
	  res.send({save: "success"});
	});
};