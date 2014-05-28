var express = require('express');
var bodyParser = require('body-parser');
var api = require('./lib/routes');
var config = require('./lib/util/config');

// Express middlewares

api.use(bodyParser());

// Start listening

api.listen(
  config.get('server:port'),
  config.get('server:host')
);