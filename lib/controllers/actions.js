/* jshint node: true */
var JaySchema = require('jayschema');
var jay = new JaySchema();
var errors = require('./errors');

// Schéma de validation des données envoyées par l'utilisateur
// dans le handler addAction
var ADD_ACTION_SCHEMA = {
  type: 'array',
  $schema: 'http://json-schema.org/draft-04/schema#',
  required: true,
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      params: {
        type: 'object'
      }
    },
    required: ['name']
  },
  additionnalItems: false,
  minItems: 1
};

/*
  Exemple requete CURL:

  curl -X POST -H "Content-Type:application/json" -v -u "test:test" -d '[{"name":"move", "params": {"foo": "bar"}}]' http://localhost:8080/actions

*/
exports.addAction = function(req, res, next) {

  var bot = req.bot;

  // L'utilisateur peut envoyer soit une seule action, soit un tableau d'actions
  // On travaille toujours à partir d'un tableau
  var actions = Array.isArray(req.body) ? req.body : [req.body];

  jay.validate(actions, ADD_ACTION_SCHEMA, function(err) {

    if(err) {
      return next(new errors.ValidationError(err));
    }

    bot.addActions(actions, function(err) {

      if(err) {
        return next(new errors.ValidationError(err));
      }

      bot.save(function(err) {

        if(err) {
          return next(err);
        }

        return res.send(201);

      });

    });

  });

};