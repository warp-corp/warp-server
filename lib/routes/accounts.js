var express = require('express');
var exports = module.exports = express();
var accountsCtrl = require('../controllers').accounts;
var requireAuth = require('./middlewares/basic-auth');
var rateLimiter = require('./middlewares/rate-limiter');

// Get player's infos
exports.get('/', requireAuth, rateLimiter, accountsCtrl.showUser);

// Add new player
// Exemple CURL: curl -X POST -H "Content-Type:application/json" -v -d '{"name":"test1", "email": "test1@test1.com", "password": "test1"}' http://localhost:8080/account
exports.post('/', accountsCtrl.register);

// Delete player's account
exports.delete('/', requireAuth, rateLimiter, accountsCtrl.erase);


