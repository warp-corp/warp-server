var models = require('../models');
var EventEmitter = require('events').EventEmitter;

var exports = module.exports = new EventEmitter();

var _tInterval = 5000;
var _running = false;
var _timeoutID;

exports.start = function(interval) {
  _tInterval = interval || _tInterval;
  if(!_running) {
    _timeoutID = setTimeout(exports.doTurn, _tInterval);
  }
  _running = true;
};

exports.stop = function() {
  if(_running) {
    clearTimeoutID(_timeoutID);
  }
  _running = false;
};

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

        // On récupère toutes les actions dont le tour prévu d'exécution est le tour courant
        var query = models.Action.find({
          turn: { $gte: gameStatus.turn }
        });

        query.stream()
          .on('data', executeAction)
          .on('close', endTurn);

      });

    });

};

var remaining = 0; // Compteur des actions restant à exécuter

function executeAction(action) {
  remaining++;
  // TODO: Tester la validité de l'action, l'exécuter et la supprimer de la pile du bot
  remaining--;
  endTurn();
};

function endTurn() {
  if(remaining === 0) {
    if(_running) {
      // On relance le timer
      _timeoutID = setTimeout(exports.doTurn, _tInterval);
    }
  }
};