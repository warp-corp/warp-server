var bunyan = require('bunyan');
var mainLogger = require('../../util/logger');

module.exports = function requestLogger() {

  var logger = mainLogger.child({
    logger: 'RequestLogger',
    serializers: {
      req: bunyan.stdSerializers.req
    }
  });

  return function(req, res, next) {
    logger.info({req: req}, 'Request');
    return next();
  };

};