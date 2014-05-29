var JaySchema = require('jayschema');
var jay = new JaySchema();
var models = require('../models');

var slice = Array.prototype.slice;

exports.getBotActions = function(req, res, next) {
  var bot = req.bot;
  res.send(bot.actions);
};

// Schéma de validation des données envoyées par l'utilisateur
// dans le handler addAction
var ADD_ACTION_SCHEMA = {
  type: "array",
  $schema: "http://json-schema.org/draft-04/schema#",
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

  jay.validate(actions, ADD_ACTION_SCHEMA, function(errors) {

    if(errors) {
      return res.send(400, errors);
    }

    if(bot.actions.length < bot.maxActions) {

      bot.actions.push.apply(bot.actions, actions);

      bot.save(function(err, bot) {

        if(err) {
          return res.send(400, err);
        }

        return res.send(201);

      });


    } else {
      res.send(400, {error: "Nombre maximum d'actions déjà atteint."});
    }

  });

};