var restify = require('restify');

module.exports = function(server) {

  server.use(restify.gzipResponse());
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.authorizationParser());
  server.use(restify.requestLogger());

};