var orm = require('../util/orm');
var Promise = require('bluebird');
var validator = require('validator');
var bcrypt = require('bcrypt');
var ValidationError = require('../errors').ValidationError;
var config = require('../util/config');

var User = orm.Model.extend({

    tableName: 'users',

    bot: function() {
      return this.hasOne('Bot');
    }

  }, {

  register: Promise.method(function(name, email, password) {

    if (!validator.isAlphanumeric(name)) {
      throw new new ValidationError('Name must be alphanumeric.');
    }

    if (!validator.isEmail(email)) {
      throw new ValidationError('Incorrect email address.');
    }

    return new Promise(function(fulfill, reject) {

      var rounds = config.get('bcrypt:rounds');

      bcrypt.hash(password, rounds, function(err, hash) {

        if(err) return reject(err);

        var user = new User({
          name: name,
          email: email,
          hash: hash
        });

        return fulfill(user.save());

      });

    });

  })

});

module.exports = User;

/*var UserSchema = new Schema({

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

module.exports = mongoose.model('User', UserSchema);*/