/* jshint node: true */
var JaySchema = require('jayschema');
var jay = new JaySchema();
var errors = require('../errors');
var ACTIONS = require('../game/actions');

// Schéma de validation des données envoyées par l'utilisateur
// dans le handler addAction
var ACTION_SCHEMA = {
  $schema: 'http://json-schema.org/draft-04/schema#',
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
};

/*
  Exemple requete CURL:

  curl -X POST -H "Content-Type:application/json" -v -u "test:test" -d '{"name":"move", "params": {"foo": "bar"}}' http://localhost:8080/bot/actions

*/
exports.doAction = function(req, res, next) {

  var bot = req.bot;

  // L'utilisateur peut envoyer une action
  var action = req.body;

  jay.validate(action, ACTION_SCHEMA, function(err) {

    if(err) {
      return next(new errors.ValidationError(err));
    }

    // On récupère la "logique" de l'action
    var actionLogic = ACTIONS[action.name];

    if(actionLogic) { // Si l'action existe

      // L'action est elle en cooldown pour ce bot ?
      if( bot.inCooldown(action.name) ) {
        return next( new errors.ActionCooldownError(action.name) );
      }

      // On rafraichit le cooldown
      bot.refreshCooldown(action.name, function(err) {

        if(err) {
          return next(err);
        }

        actionLogic.execute(bot, action.params, function(err, results) {

          if(err) {
            return next(err);
          }

          // On retourne les résultats de l'action
          return res.send({
            action: action.name,
            results: results
          });

        });

      });

    } else {
      return next(new errors.UnknownAction(action.name));
    }

  });

};