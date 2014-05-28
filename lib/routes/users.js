var express = require('express');
var exports = module.exports = express();
var usersCtrl = require('../controllers').users;
var passport 			= require('passport');
var requireAuth = require('./middleware/basic-auth');

exports.use(passport.initialize());

// Get player's infos
exports.get('/', requireAuth, usersCtrl.getInfo);

// Add new player
exports.post('/:username/:pwd/:email', usersCtrl.register);

// Delete player's account
exports.delete('/:user', requireAuth, usersCtrl.erase);


