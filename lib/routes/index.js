var express = require('express');
var bodyParser = require('body-parser');
var api = express();
var cors = require('cors');
var requireAuth = require('./middleware/basic-auth');

/* Common middlewares */

api.use(bodyParser());
api.use(cors());

/* Routes */

api.use('/account', require('./accounts'));

module.exports = api;