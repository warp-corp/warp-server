/* jshint node: true */
var api = require('./lib/routes');
var config = require('./lib/util/config');
var logger = require('./lib/util/logger');

logger.info('Starting API endpoint');

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