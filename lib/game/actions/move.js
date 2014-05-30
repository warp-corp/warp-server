/* jshint node: true */
module.exports = {
  
  // Doit retourner le délai en tours avant l'exécution de l'action
  getDelay: function() {
    return 1;
  },

  // Valide les paramètres associés à l'action
  validate: function(params) {
    // TODO validation des paramètres de l'action "move"
    return true;
  },

  // Exécute l'action
  execute: function(bot, params, done) {
    // TODO tester la validité de l'action et l'executer
    console.log('Execute move for bot', bot._id, 'with params', params);
    return done();
  }

};