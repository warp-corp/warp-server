var express = require('express');
var exports = module.exports = express();
var actionsCtrl = require('../controllers').actions;

exports.get('/', actionsCtrl.getUserActions);
exports.post('/', actionsCtrl.addAction);