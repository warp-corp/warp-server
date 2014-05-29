var express = require('express');
var exports = module.exports = express();
var accountsCtrl = require('../controllers').accounts;
var requireAuth = require('./middleware/basic-auth');

// Get player's infos
exports.get('/', requireAuth, accountsCtrl.getInfo);

// Add new player
exports.post('/:username/:pwd/:email', accountsCtrl.register);

// Delete player's account
exports.delete('/', requireAuth, accountsCtrl.erase);


