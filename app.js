var restify = require('restify');
var config = require('./lib/util/config');

var serverConf = config.get('server');

var server = restify.createServer(serverConf);

require('./lib/middlewares')(server);
require('./lib/routes')(server);

server.listen(serverConf.port);