var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  name: {
    type: String,
    unique: true
  },

  password: {
  	type: String
  },

  email: {
  	type: String,
  	unique: true
  },

  bot: {
    type: Schema.Types.ObjectId,
    ref: 'Bot'
  }

});

// Suppression de champs lors de l'appel à toJSON()
UserSchema.method('toJSON', function() {
  var user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
});

module.exports = mongoose.model('User', UserSchema);