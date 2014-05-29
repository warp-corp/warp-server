var express = require('express');
var exports = module.exports = express();
var actionsCtrl = require('../controllers').actions;
var requireAuth = require('./middleware/basic-auth');
var loadBot = require('./middleware/load-bot');

exports.get('/', requireAuth, loadBot, actionsCtrl.getBotActions);
exports.post('/', requireAuth, loadBot, actionsCtrl.addAction);