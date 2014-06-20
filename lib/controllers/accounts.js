/* jshint node: true */
var orm = require('../util/orm');
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
exports.showUser = function(req, res) {

  var user = req.user;

	res.send(user);

};

// Enregistrement d'un nouveau joueur
//
exports.register = function(req, res, next) {

  var data = req.body;

  jay.validate(data, REGISTER_SCHEMA, function(errors) {

    if(errors) {
      return next(new ValidationError(errors));
    }

    User.register(data.name, data.email, data.password)
      .then(function(user) {
        res.send(201, user);
      })
      .catch(next);

  });

};

// Suppression d'un compte
//
exports.erase = function(req, res, next) {

  var user = req.user;

  user.deleteAccount()
    .then(function() {
      res.send(204);
    })
    .catch(next);

};