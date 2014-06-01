/* jshint node: true */
// Charge automatiquement le bot de l'utilisateur et créait un raccourci req.bot
module.exports = function autoLoadBot(req, res, next) {
  var user = req.user;
  user.populate('bot', function(err, user) {
    if(err) {
      return next(err);
    }
    req.bot = user.bot;
    return next();
  });
};