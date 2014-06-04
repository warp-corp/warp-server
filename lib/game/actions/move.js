/* jshint node: true */
module.exports = {
  
  // Doit retourner le délai en tours avant l'exécution de l'action
  cooldown:  60 * 1000, // 1 minute de cooldown

  // Exécute l'action
  execute: function(bot, params, done) {
    // TODO tester la validité de l'action et l'executer
    console.log('Execute move for bot', bot._id, 'with params', params);
    return done();
  }

};