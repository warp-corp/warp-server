var express = require('express');
var exports = module.exports = express();
var playersCtrl = require('../controllers').players;

// Get player's infos
exports.get('/:player', playersCtrl.getInfo);

// Add new player
exports.post('/:player', playersCtrl.register);

// Delete player's account
exports.delete('/:player', playersCtrl.erase);

