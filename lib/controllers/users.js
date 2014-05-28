
var User 	= require('../models').User;
var user 	= new User();
var crypt = require("apache-crypt");

exports.getInfo = function(req, res) {
	var username = req.param('user');
  User.findOne({ name: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    
   res.send(user);
  });
};

exports.register = function(req, res) {
	user.name = req.param('username');
	user.password = crypt(req.param('pwd'));;
	user.email = req.param('email');

	user.save( function (err) {
    if (err) 
    	console.log(err);

    res.redirect('/user/' + user.name);
  });
};

exports.erase = function(req, res) {
	var username = req.param('user');
  User.remove({ name: username }, function (err) {
	  if (err) return handleError(err);
	  res.send({save: "success"});
	});
};