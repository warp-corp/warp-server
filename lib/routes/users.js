var express = require('express');
var exports = module.exports = express();
var playersCtrl = require('../controllers').players;
var requireAuth = require('./middleware/basic-auth');

// Get player's infos
exports.get('/:user', requireAuth, playersCtrl.getInfo);

// Add new player
exports.post('/:user', playersCtrl.register);

// Delete player's account
exports.delete('/:user', requireAuth, playersCtrl.erase);

