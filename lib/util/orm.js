var config = require('./config');
var knex = require('knex')(config.get('database'));
var orm = require('bookshelf')(knex);

orm.plugin('registry');
orm.plugin('virtuals');

module.exports = orm;