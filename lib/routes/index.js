var express = require('express');
var bodyParser = require('body-parser');
var api = express();
var cors = require('cors');
var passport = require('passport');

/* Common middlewares */

api.use(bodyParser());
api.use(cors());
api.use(passport.initialize());

/* Routes */

api.use('/account', require('./accounts'));

module.exports = api;