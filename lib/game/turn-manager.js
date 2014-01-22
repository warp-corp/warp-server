// TurnManager
var Logger = require('../util/logger');
var Action = require('../models/action');

var _currentTurn = 0;
var _tInterval = 5000;
var _running = false;
var _timeoutID;

exports.doTurn = function() {

  Logger.info({turn: _currentTurn});
  
  var query = Action.find({
    turn: { $gte: _currentTurn }
  });

  query.stream()
    .on('data', executeAction)
    .on('close', endTurn);

};

var remaining = 0;
function executeAction(action) {
  remaining++;
  remaining--;
  endTurn();
};

function endTurn() {
  if(remaining === 0) {
    _currentTurn++;
    if(_running) {
      _timeoutID = setTimeout(exports.doTurn, _tInterval);
    }
  }
};

exports.getCurrentTurn = function() {
  return _currentTurn;
};

exports.start = function() {
  if(!_running) {
    _timeoutID = setTimeout(exports.doTurn, _tInterval);
  }
  _running = true;
}

exports.stop = function() {
  if(_running) {
    clearTimeoutID(_timeoutID);
  }
  _running = false;
}