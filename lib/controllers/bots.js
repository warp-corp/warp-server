
var Bot 	      = require('../models').Bot;

// Renvoi le bot appartenant à l'utilisateur courant
//
exports.getBot = function(req, res) {
  var user = req.user;
  user.populate('bot', function(err, user) { 
    if (err)
      return console.log(err);
    res.send(user.bot.toJSON({virtuals: true}));
  });
};