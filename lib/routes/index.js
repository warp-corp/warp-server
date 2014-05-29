var express = require('express');
var bodyParser = require('body-parser');
var api = express();
var cors = require('cors');
var requireAuth = require('./middleware/basic-auth');

api.use(bodyParser());
api.use(cors());

api.use('/zones', require('./zones'));

api.use('/users', require('./users'));

api.use('/notfound', function(req, res) {
	res.send(404, "Sorry we can't find that!");
});

module.exports = api;