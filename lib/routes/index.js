var express = require('express');
var api = express();

api.use('/zones', require('./zones'));

module.exports = api;