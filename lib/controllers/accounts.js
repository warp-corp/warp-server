
var User        = require('../models').User;
var Bot 	      = require('../models').Bot;
var crypt       = require("apache-crypt");
var validator   = require('validator');
var user        = new User();

// Renvoi les informations de l'utilisateur courant
//
exports.getInfo = function(req, res) {
	res.send(req.user.toJSON({hide: 'password'}));
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
  nBot.user = user;

  if (!validator.isAlphanumeric(user.name))
    return res.send(400, {message: "Name must be alphanumeric."});
  if (!validator.isEmail(user.email))
    return res.send(400, {message: "Incorrect email address."});
  
	user.save( function (err) {
    if (err) 
    	return res.send(err);

    nBot.save( function(err) {
      if (err) 
        return res.send(err);
    });

    res.send(201, user);
  });
};

// Suppression d'un compte
// 
exports.erase = function(req, res) {
	var user = req.user;
  User.remove({ _id: user._id }, function (err) {
	  if (err) return console.log(err);
	  res.send(201, {delete: "success"});
	});
};