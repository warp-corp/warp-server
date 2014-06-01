var bunyan = require('bunyan');
var config = require('./config');
var logger = bunyan.createLogger(config.get('logger'));
module.exports = logger;