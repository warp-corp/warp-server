var express = require('express');
var api = express();
var requireAuth = require('./middleware/basic-auth');


api.use('/zones', require('./zones'));

api.use('/users', require('./users'));

api.use('/notfound', function(req, res) {
	res.send(404, "Sorry we can't find that!");
});

module.exports = api;