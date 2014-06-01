/* jshint node: true */
var mongoose = require('mongoose');
var api = require('./lib/routes');
var config = require('./lib/util/config');
var logger = require('./lib/util/logger');

logger.info('Starting API endpoint');

// Connect to database

mongoose.connect(
  config.get('database:uri'),
  config.get('database:options')
);

// Start listening

api.listen(
  config.get('server:port'),
  config.get('server:host'),
  function(err) {
    if(err) {
      logger.fatal(err);
      return process.exit(1);
    }
    logger.info(config.get('server'), 'Listening');
  }
);