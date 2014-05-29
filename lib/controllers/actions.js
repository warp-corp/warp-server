var models = require('../models');

exports.getUserActions = function(req, res) {

};

exports.addAction = function(req, res) {

  var user = req.user;

  user.populate('bot', function() {
    //TODO
  });

};