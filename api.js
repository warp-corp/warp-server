/* jshint node: true */
var mongoose = require('mongoose');
var api = require('./lib/routes');
var config = require('./lib/util/config');

// Connect to database

mongoose.connect(
  config.get('database:uri'),
  config.get('database:options')
);

// Start listening

api.listen(
  config.get('server:port'),
  config.get('server:host')
);