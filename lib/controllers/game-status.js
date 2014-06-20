/* jshint node: true */
var pkg = require('../../package.json');
var orm = require('../util/orm');
var Promise = require('bluebird');

exports.showGameInfos = function(req, res, next) {

  Promise.all([
    orm.knex('users').count('* as players').first(),
    orm.knex('sectors').count('* as sectors').first()
  ])
  .then(function(results) {

    res.send({
      title: "Warp",
      version: pkg.version,
      stats: {
        players: results[0].players,
        sectorsExplored: results[1].sectors
      }
    });

  })
  .catch(next);

};