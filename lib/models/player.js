var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({

  name: {
    type: String,
    unique: true
  },

  bot: {
    type: Schema.Types.ObjectId,
    ref: 'Bot'
  }

});

module.exports = mongoose.model('Player', PlayerSchema);