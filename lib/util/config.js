var path = require('path');
var os = require('os');
var nconf = require('nconf');

// Config hierarchy:
// env -> args -> defaults.json -> $ENV.json -> $HOSTNAME.json

nconf
  .env()
  .argv();

var configDir = nconf.get('configDir') || 'config';

nconf.file('host', {
  file: path.join(configDir, os.hostname() + '.json')
});

nconf.file('environment', {
  file: path.join(configDir, process.env.NODE_ENV + '.json')
});

nconf.file('defaults', {
  file: path.join(configDir, 'defaults.json')
});

module.exports = nconf;