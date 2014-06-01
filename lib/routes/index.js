var express = require('express');
var bodyParser = require('body-parser');
var api = express();
var cors = require('cors');
var passport = require('passport');
var requestLogger = require('./middlewares/request-logger');
var errorHandler = require('./middlewares/error-handler');

/* Common middlewares */

api.use(bodyParser());
api.use(cors());
api.use(passport.initialize());
api.use(requestLogger());

/* Routes */

api.use('/account', require('./accounts'));
api.use('/bot', require('./bot'));

/* ErrorHandler - /!\ doit être appelé en dernier  */
api.use(errorHandler());

module.exports = api;