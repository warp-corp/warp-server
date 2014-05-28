var express = require('express');
var api = express();
var requireAuth = require('./middleware/basic-auth');

api.use('/zones', require('./zones'));
api.use('/users', require('./users'));

module.exports = api;