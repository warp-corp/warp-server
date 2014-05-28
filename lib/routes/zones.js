var express = require('express');
var exports = module.exports = express();
var zonesCtrl = require('../controllers').zones;
var passport 			= require('passport');
var requireAuth = require('./middleware/basic-auth');

// middleware
exports.use(passport.initialize());
exports.use(requireAuth);

// routes
exports.get('/', zonesCtrl.getUserZone);

exports.get('/:x/:y', zonesCtrl.getZone);