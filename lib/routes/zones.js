var express = require('express');
var exports = module.exports = express();
var zonesCtrl = require('../controllers').zones;

exports.get('/', zonesCtrl.getUserZone);

exports.get('/:x/:y', zonesCtrl.getZone);