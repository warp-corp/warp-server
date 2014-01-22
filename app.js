var restify = require('restify');
var mongoose = require('mongoose');
var config = require('./lib/util/config');
var Logger = require('./lib/util/logger');
var TurnManager = require('./lib/game/turn-manager');

mongoose.connect(config.get('database'));

var serverOpts = config.get('server');
serverOpts.log = Logger;

var server = restify.createServer(serverOpts);

require('./lib/middlewares')(server);
require('./lib/routes')(server);

server.listen(serverOpts.port, serverOpts.host);

TurnManager.start();



