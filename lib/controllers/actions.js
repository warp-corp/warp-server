/* jshint node: true */
var JaySchema = require('jayschema');
var jay = new JaySchema();
var errors = require('../errors');

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

  // L'utilisateur peut envoyer une action
  var action = req.body;

  jay.validate(action, ACTION_SCHEMA, function(err) {

    if(err) {
      return next(new errors.ValidationError(err));
    }

    req.user.related('bot')
      .fetch({
        withRelated: ['slots', 'sector']
      })
      .then(function(bot) {
        req.logger.debug({botId: bot._id, action: action}, 'Executing action');
        return bot.execute(action.name, action.params);
      })
      .then(function(results) {
        res.send(200, {
          action: action.name,
          results: results
        })
      })
      .catch(next);


  });

};