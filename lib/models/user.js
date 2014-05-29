var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');;


var UserSchema = new Schema({

  name: {
    type: String,
    require: true,
    unique: true
  },

  password: {
  	type: String,
    require: true
  },

  email: {
  	type: String,
    require: true,
  	unique: true
  },

  bot: {
    type: Schema.Types.ObjectId,
    ref: 'Bot'
  }

});

UserSchema.plugin(uniqueValidator);

// Suppression de champs lors de l'appel à toJSON()
UserSchema.method('toJSON', function() {
  var user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
});

module.exports = mongoose.model('User', UserSchema);