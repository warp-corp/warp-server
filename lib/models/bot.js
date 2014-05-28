var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO
var BotSchema = new Schema({
  
  player: {
  	type: Schema.Types.ObjectId,
    ref: 'Player'
  },

  sector: {
  	type: Schema.Types.ObjectId,
    ref: 'Zone'
  }, 

  coords: {
  	x: Number,
  	y: Number
  },

  maxSlot: {
  	type: Number,
  	min: 5
  },

  slots: [Schema.Types.Mixed],

  actions: []

});

module.exports = mongoose.model('Bot', BotSchema);