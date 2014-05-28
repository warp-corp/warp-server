var express = require('express');
var api = express();

api.use('/zones', require('./zones'));
api.use('/player', require('./players'));

module.exports = api;