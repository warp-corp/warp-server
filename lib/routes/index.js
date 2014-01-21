var controllers = require('../controllers');

module.exports = function(server) {

  // Register
  server.post('/register', controllers.register.createUser);

  // Bot

};