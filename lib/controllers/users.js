
var User 	= require('../models').User;
var user 	= new User();
var crypt = require("apache-crypt");

// Renvoi les informations de l'utilisateur courant
//
exports.getInfo = function(req, res) {
	var username = req.user.name;
  User.findOne({ name: username }, function (err, user) {
    if (err) { return console.log(err); }
    if (!user) { return res.redirect('/notfound'); }
    res.send(user);
  });
};

// Enregistrement d'un nouveau joueur
// TODO:
//  - Vérification de la validité des données
//  
exports.register = function(req, res) {
	user.name = req.param('username');
	user.password = crypt(req.param('pwd'));;
	user.email = req.param('email');

	user.save( function (err) {
    if (err) 
    	console.log(err);

    res.redirect('/user/' + user.name);
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