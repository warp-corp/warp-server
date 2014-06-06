/* jshint node: true */
var mongoose = require('mongoose');

module.exports = {
    
  // Doit retourner le délai en tours avant l'exécution de l'action
  cooldown:  10 * 1000, // 10 secondes de cooldown

  // Exécute l'action
  execute: function(bot, params, done) {
    var Bot = mongoose.model('Bot');
    var cond = {
      "coords.x": bot.coords.x,
      "coords.y": bot.coords.y
    }

    Bot.find(cond, function(err, bots) {
      if (err) {
        console.log(err);
      }

      var nbBot = (bots) ? bots.length-1 : 0; 

      return done(null, {nb: nbBot});
    });
  }

};