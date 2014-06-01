/* jshint node: true */
var mongoose = require('mongoose');
var config = require('./lib/util/config');
var TurnManager = require('./lib/util/turn-manager');

mongoose.connect(
  config.get('database:uri'),
  config.get('database:options')
);

TurnManager.start(
  config.get('ticker').interval
);