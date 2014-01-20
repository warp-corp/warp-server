/**
 * User
 *
 * @module      :: Model
 * @description :: A Warp User
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
  	
    nickname: {
      type: 'string',
      required: true,
      unique: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    hash: {
      type: 'string',
      required: true
    },

    beforeCreate: encryptPassword,
    beforeUpdate: encryptPassword
    
  }

};

function encryptPassword(values, next) {
  bcrypt.hash(values.password, 10, function(err, hash) {
    if(err) {
      return next(err);
    }
    values.hash = hash;
    next();
  });
}
