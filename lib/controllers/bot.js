/* jshint node: true */

// Renvoi le bot appartenant à l'utilisateur courant
exports.getBot = function(req, res, next) {

  var user = req.user;

  user.related('bot')
    .fetch({
      withRelated: ['sector', 'cooldowns', 'slots', 'cargo']
    })
    .then(res.send.bind(res))
    .catch(next);

};