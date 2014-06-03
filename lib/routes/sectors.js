var express = require('express');
var exports = module.exports = express();
var SectorsCtrl = require('../controllers').sectors;
var passport 			= require('passport');
var requireAuth = require('./middlewares/basic-auth');
var loadBot = require('./middlewares/load-bot');

// Get current user's bot
exports.get('/', requireAuth, loadBot, SectorsCtrl.getCurrent);

// Initialise une partie
// 	- Pour le développement, à voir pour externaliser toutes
// 	les méthodes permettant l'instanciation / gestion pure du jeu
exports.get('/bootstrap', requireAuth, SectorsCtrl.bootstrap);





