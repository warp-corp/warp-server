
var User        = require('../models').User;
var Bot 	      = require('../models').Bot;
var crypt       = require("apache-crypt");
var validator   = require('validator');
var JaySchema   = require('jayschema');
var jay         = new JaySchema();
var user        = new User();

// Schéma de validation des données envoyées par l'utilisateur
// dans le handler register
var REGISTER_SCHEMA = {
  type: "array",
  $schema: "http://json-schema.org/draft-04/schema#",
  required: true,
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      email: {
        type: 'string'
      }
    },
    required: ['name', 'password', 'email']
  },
  additionnalItems: false,
  minItems: 3
};

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

  var data = Array.isArray(req.body) ? req.body : [req.body];;
  
  jay.validate(data, REGISTER_SCHEMA, function(errors) {

    if(errors) {
      return res.send(400, errors);
    }

    if (!validator.isAlphanumeric(data[0].name))
      return res.send(400, {message: "Name must be alphanumeric."});
    if (!validator.isEmail(data[0].email))
      return res.send(400, {message: "Incorrect email address."});

    var nBot = new Bot();

    user.name = data[0].name;
    user.password = crypt(data[0].password);
    user.email = data[0].email;
    user.bot = nBot;
    nBot.owner = user;

    user.save( function (err) {
      if (err)
        return res.send(400, err);

      nBot.save( function(err) {
        if (err)
          return res.send(400, err);
      });

      return res.send(201, user);
    });
  });

};

// Suppression d'un compte
//
exports.erase = function(req, res) {
	var user = req.user;
  User.remove({ _id: user._id }, function (err) {
	  if (err) return res.send(400, err);
	  res.send(201, {delete: "success"});
	});
};