/* jshint node: true */

// Renvoi le bot appartenant à l'utilisateur courant
exports.getBot = function(req, res) {
  var user = req.user;
  var bot = user.bot.toJSON();
  bot.owner = {name: user.name};
  res.send(bot);
};