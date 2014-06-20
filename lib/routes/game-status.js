var express = require('express');
var exports = module.exports = express();
var gameStatusCtrl = require('../controllers').gameStatus;

exports.get('/', gameStatusCtrl.showGameInfos);