/* jshint node: true */
module.exports = {
  
  // Doit retourner le délai en tours avant l'exécution de l'action
  cooldown:  60 * 1000, // 1 minute de cooldown

  // Exécute l'action
  execute: function(bot, params, done) {
    // TODO tester la validité de l'action et l'executer
    return done();
  }

};