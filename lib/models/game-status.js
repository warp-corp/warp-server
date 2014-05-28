var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameStatusSchema = new Schema({

  name: {
    type: String
  },

  turn: {
    type: Number,
    default: 0,
    min: 0
  }

});

GameStatusSchema.pre('save', function (next) {
  this.name = 'game-status';
  return next();
});

GameStatusSchema.statics.getSingleton = function(cb) {
  var GameStatus = mongoose.model('GameStatus');
  return GameStatus
    .findOne({name: 'game-status'}, function(err, gameStatus) {
      if(err) {
        return cb(err);
      }
      if(gameStatus) {
        return cb(null, gameStatus);
      } else {
        gameStatus = new GameStatus();
        gameStatus.save(function(err, gameStatus) {
          if(err) {
            return cb(err);
          }
          return cb(null, gameStatus);
        });
      }
    });
};

module.exports = mongoose.model('GameStatus', GameStatusSchema);