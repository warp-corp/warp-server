var restify = require('restify');
var mongoose = require('mongoose');
var config = require('./lib/util/config');
var logger = require('./lib/util/logger');

mongoose.connect(config.get('database'));

var serverOpts = config.get('server');
serverOpts.log = logger;

var server = restify.createServer(serverOpts);

require('./lib/middlewares')(server);
require('./lib/routes')(server);

server.listen(serverOpts.port, serverOpts.host);






