/* jshint node: true */
var Promise = require('bluebird');
var orm = require('../../util/orm');

module.exports = {

  // Doit retourner le délai en tours avant l'exécution de l'action
  cooldown:  60 * 1000, // 60s de cooldown

  // Exécute l'action
  execute: Promise.method(function(bot) {
    return orm.model('Bot')
      .where({
        'sector_id': bot.get('sector_id')
      })
      .fetchAll()
      .then(function(bots) {
        // Retourne la liste des bots minus le bot à l'initiative de l'action
        return {
          bots: bots.reject(function(b) { return bot.id === b.id; })
        };
      });
  })

};