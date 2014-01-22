var bunyan = require('bunyan');
var config = require('./config');

var loggerConfig = config.get('logger');

module.exports = bunyan.createLogger(loggerConfig);