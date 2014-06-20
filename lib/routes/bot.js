var express = require('express');
var exports = module.exports = express();
var botCtrl = require('../controllers').bot;
var actionsCtrl = require('../controllers').actions;
var passport 			= require('passport');
var requireAuth = require('./middlewares/basic-auth');
var rateLimiter = require('./middlewares/rate-limiter');

// Get current user's bot
exports.get('/', requireAuth, botCtrl.getBot);

// Permet à l'utilisateur d'ajouter des actions
exports.post('/actions', requireAuth, rateLimiter, actionsCtrl.doAction);



