/* jshint node: true */
var User = require('../models').User;
var JaySchema = require('jayschema');
var jay = new JaySchema();
var ValidationError = require('../errors').ValidationError;

// Schéma de validation des données envoyées par l'utilisateur
// dans le handler register
var REGISTER_SCHEMA = {
  type: 'object',
  $schema: 'http://json-schema.org/draft-04/schema#',
  properties: {
    name: {
      type: 'string'
    },
    password: {
      type: 'string',
    },
    email: {
      type: 'string'
    }
  },
  required: ['name', 'password', 'email']
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
exports.register = function(req, res, next) {

  var data = req.body;

  jay.validate(data, REGISTER_SCHEMA, function(errors) {

    if(errors) {
      return next(new ValidationError(errors));
    }

    User.register(data.name, data.email, data.password)
      .then(function(user) {
        res.send(201);
      })
    
  });

};

// Suppression d'un compte
//
exports.erase = function(req, res, next) {
  var user = req.user;
  User.remove({ _id: user._id }, function (err) {
    if(err) {
      return next(err);
    }
    res.send(204);
  });
};