/* jshint node: true */

var Promise = require('bluebird');
var orm = require('../../util/orm');
var errors = require('../../errors');

module.exports = {

  // Doit retourner le délai en tours avant l'exécution de l'action
  cooldown:  60 * 1000, // 60s de cooldown

  // Exécute l'action
  execute: Promise.method(function(bot, params) {

    var Sector = orm.model('Sector');

    // On effectue toutes les opérations dans une transaction
    return orm.transaction(function(trx) {

      var opts = {transacting: trx};

      // On récupère le secteur courant du Bot
      return bot.related('sector')
        .fetch(opts)
        .then(function(currentSector) {

          var dir = params.dir;
          var coords = {x: currentSector.get('x'), y: currentSector.get('y')};

          switch (dir) {
            case "N" :
              coords.y -= 1;
              break;
            case "S" :
              coords.y += 1;
              break;
            case "W" :
              coords.x -= 1;
              break;
            case "E" :
              coords.x += 1;
              break;
            case "NE" :
              coords.x += 1;
              coords.y -= 1;
              break;
            case "SE" :
              coords.x += 1;
              coords.y += 1;
              break;
            case "SW" :
              coords.x -= 1;
              coords.y += 1;
              break;
            case "NW" :
              coords.x -= 1;
              coords.y -= 1;
              break;
            default:
              throw new errors.UnknownDirectionError(dir);
          }

          return coords;

        })
        .then(function(coords) {
          return Sector
            .where(coords)
            .fetch(opts)
            .then(function(existing) {
              if(existing) {
                return existing;
              } else {
                return new Sector(coords).save(null, opts);
              }
            });
        })
        .then(function(destination) {
          bot.set('sector_id', destination.id);
          return bot.save(null, opts);
        })
        .then(function() {
          delete bot.relations.sector;
          return bot.related('sector').fetch(opts);
        });

    });

  })

};