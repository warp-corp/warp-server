var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  username: {
    type: String,
    unique: true
  },

  bot: {
    type: Schema.Types.ObjectId,
    ref: 'Bot'
  },

  passwordHash: {
    type: String
  }

});

UserSchema.statics.authenticate = function(username, password, cb) {
  User.findOne({username: username}, function(err, user) {
    if(err) {
      return cb(err);
    }
    if(user) {
      bcrypt.compare(password, user.passwordHash, function(err, result) {
        if(err) {
          return cb(err);
        }
        return cb(null, result ? user : null);
      });
    } else {
      return cb(null, null);
    }
  });
};

// Hash password before saving
UserSchema.pre('save', true, function(next, done) {
  var self = this;
  var password = self.password;
  if(password) {
    delete self.password;
    bcrypt.hash(password, 10, function(err, hash) {
      if(err) {
        return done(err);
      }
      self.passwordHash = hash;
      return done();
    });
  }
  return next();
});

module.exports = mongoose.model('User', UserSchema);