var express = require('express');
var exports = module.exports = express();
var botsCtrl = require('../controllers').bots;
var passport 			= require('passport');
var requireAuth = require('./middleware/basic-auth');

exports.use(passport.initialize());

// Get current user's bot
exports.get('/', requireAuth, botsCtrl.getBot);



