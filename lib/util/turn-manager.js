/* jshint node: true, globals: true */
var async = require('async');
var models = require('../models');
var EventEmitter = require('events').EventEmitter;
var AVAILABLE_ACTIONS = require('../game/actions');
var mainLogger = require('./logger');
var logger = mainLogger.child({logger: 'TurnManagerLogger'});

var exports = module.exports = new EventEmitter();

var _tInterval, _timeoutID;
var _running = false;

exports.start = function(interval) {
  _tInterval = interval;
  if(!_running) {
    logger.info('TurnManager started', {interval: _tInterval});
    _timeoutID = setTimeout(exports.doTurn, _tInterval);
  }
  _running = true;
};

exports.stop = function() {
  if(_running) {
    clearTimeout(_timeoutID);
    logger.info('TurnManager stopped');
  }
  _running = false;
};

function sortByInverseCpus(botA, botB) {
  return botB.cpus - botA.cpus;
}


function executeBotAction(bot, cb) {

  var action = bot.actions.$shift();
  var actionLogic = AVAILABLE_ACTIONS[action.name];

  bot.save(function(err) {

    if(err) {
      return exports.emit('error', err);
    }

    if(!actionLogic) {
      logger.error({
        botId: bot._id,
        action: action
      }, 'Unkown action');
      return process.nextTick(cb);
    }

    logger.info({
      botId: bot._id,
      action: action
    }, 'Executing action');

    return actionLogic.execute(bot, action.params, cb);

  });

}

// Execution du tour
exports.doTurn = function() {

  models.GameStatus
    .getSingleton(function(err, gameStatus) {

      if(err) {
        return exports.emit('error', err);
      }

      // On incrémente le compteur de tours
      gameStatus.turn++;

      // On sauvegarde l'état du jeu
      gameStatus.save(function(err, gameStatus) {

        if(err) {
          return exports.emit('error', err);
        }

        logger.info({turn: gameStatus.turn}, 'New turn');

        // On récupère tous les robots dont la première action
        // doit s'exécuter ce tour ci (ou n'aurait pas été exécutée
        // par erreur aux tours précédents)
        var query = {
          'actions.0.turn': { $lte: gameStatus.turn }
        };

        // On récupère toutes les actions dont le tour prévu d'exécution est le
        // tour courant
        models.Bot.find(query, function(err, bots) {

          if(err) {
            return exports.emit('error', err);
          }

          // Tri des robots dans l'ordre inverse de leurs CPUs
          bots = bots.sort(sortByInverseCpus);

          // Executer séquentiellement les actions des robots
          async.forEachSeries(bots, executeBotAction, function(err) {

            if(err) {
              return exports.emit('error', err);
            }

            logger.info({turn: gameStatus.turn}, 'Turn finished');

            if(_running) {
              // On relance le timer
              _timeoutID = setTimeout(exports.doTurn, _tInterval);
            }

          });

        });

    });
  });

};