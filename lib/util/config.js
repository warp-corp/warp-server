var path = require('path');
var os = require('os');
var nconf = require('nconf');
var jsFormat = require('./js-format');

// Config hierarchy:
// env -> args -> defaults.js -> $ENV.js -> $HOSTNAME.js

nconf
  .env()
  .argv();

var configDir = nconf.get('configDir') || 'config';

nconf.file('host', {
  file: path.join(configDir, os.hostname() + '.js'),
  format: jsFormat
});

nconf.file('environment', {
  file: path.join(configDir, process.env.NODE_ENV + '.js'),
  format: jsFormat
});

nconf.file('defaults', {
  file: path.join(configDir, 'defaults.js'),
  format: jsFormat
});

module.exports = nconf;