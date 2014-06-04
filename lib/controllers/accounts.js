/* jshint node: true */
var User        = require('../models').User;
var Bot 	      = require('../models').Bot;
var crypt       = require('apache-crypt');
var validator   = require('validator');
var JaySchema   = require('jayschema');
var jay         = new JaySchema();
var user        = new User();
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

    if (!validator.isAlphanumeric(data.name)) {
      return next(new ValidationError('Name must be alphanumeric.'));
    }
    if (!validator.isEmail(data.email)) {
      return next(new ValidationError('Incorrect email address.'));
    }

    var nBot = new Bot();

    user.name = data.name;
    user.password = crypt(data.password);
    user.email = data.email;
    user.bot = nBot;
    nBot.owner = user;

    user.save( function (err) {
      if (err) {
        return next(err);
      }

      nBot.save( function(err) {
        if (err) {
          return next(err);
        }
        return res.send(201, user);
      });
      
    });
    
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