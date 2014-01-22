var restify = require('restify');
var basicAuth = require('./middlewares/basic-auth');
var controllers = require('../controllers');
var config = require('../util/config');

module.exports = function(server) {

  server.use(restify.throttle(config.get('server:throttle')));
  server.use(restify.gzipResponse());
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.authorizationParser());
  server.use(restify.requestLogger());

  // Register
  server.post('/register', controllers.register.createUser);

  // Bot
  server.get('/bot', [basicAuth, controllers.bot.showBotInfos]);
  server.post('/bot/actions', [basicAuth, controllers.bot.pushAction]);
  server.post('/bot/reset', [basicAuth, controllers.bot.resetBot]);


};