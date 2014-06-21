/* jshint node: true */

var Promise = require('bluebird');
var orm = require('../../util/orm');
var errors = require('../../errors');
var _ = require('lodash');

module.exports = exports = {

  // Doit retourner le délai en tours avant l'exécution de l'action
  cooldown:  30 * 60 * 1000, // 30min de cooldown

  fetchTarget: Promise.method(function(fromBot, targetId, maxDistance, opts) {

    opts = opts || {};

    return orm.model('Bot')
        .where({id: targetId})
        .fetch(_.extend(_.clone(opts), {
          withRelated: ['sector', 'slots']
        }))
        .then(function(target) { // Vérification de la validité de la cible
          if(!target) {
            return Promise.reject(new errors.UnknownBotTargetError(targetId));
          } else {
            return target;
          }
        })
        .then(function(target) { // Vérification de la distance maximum

          var targetSector = target.related('sector');
          var currentSector = fromBot.related('sector');
          var distance = targetSector.distanceTo(currentSector);

          if(distance > maxDistance) {
            return Promise.reject(new errors.UnreachableTargetError(targetId));
          } else {
            return target;
          }

        });

  }),

  // Exécute l'action
  execute: Promise.method(function(bot, params) {

    return orm.transaction(function(trx) {

      var opts = {transacting: trx};
      var targetId = params.target;

      return exports.fetchTarget(bot, targetId, 0, opts)
        .then(function(target) {
          return target.applyDamages(40, opts);
        });
    });

  })

};