var restify = require('restify');
var middlewares = require('./middlewares');
var controllers = require('../controllers');
var config = require('../util/config');

module.exports = function(server) {

  server.use(restify.throttle(config.get('server:throttle')));
  server.use(restify.gzipResponse());
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.authorizationParser());
  server.use(middlewares.requestLogger());

  // Register
  server.post('/register', controllers.register.createUser);

  // Bot
  server.get('/bot', [
    middlewares.basicAuth(),
    controllers.bot.showBotInfos
  ]);

  server.post('/bot/actions', [
    middlewares.basicAuth(),
    controllers.bot.pushAction
  ]);

  server.post('/bot/reset', [
    middlewares.basicAuth(),
    controllers.bot.resetBot
  ]);


};