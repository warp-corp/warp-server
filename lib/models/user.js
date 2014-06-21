var orm = require('../util/orm');
var Bot = require('./bot');
var Promise = require('bluebird');
var validator = require('validator');
var bcrypt = require('bcrypt');
var errors = require('../errors');
var config = require('../util/config');

var User = orm.Model.extend({

    tableName: 'users',
    hasTimestamps: true,

    // Champs cachés lors de la sérialisation
    hidden: ['id', 'hash', 'bot_id', 'bot', 'updated_at', 'created_at'],

    bot: function() {
      return this.hasOne(Bot);
    },

    resetBot: Promise.method(function(opts) {
      return this.related('bot')
        .fetch(opts)
        .bind(this)
        .then(function(bot) {
          // Si l'utilisateur a déjà un Bot, on supprime ce dernier
          if(bot) {
            return bot.destroy(opts);
          }
        })
        .then(function() {
          // On créait un nouveau Bot
          var bot = new Bot();
          return bot.save(null, opts);
        })
        .then(function(bot) {
          // On lie le Bot et son utilisateur
          this.set('bot_id', bot.id);
          bot.set('user_id', this.id);
          // On sauvegarde le Bot et son utilisateur
          return Promise.all([
            this.save(null, opts),
            bot.save(null, opts)
          ]);
        });
    }),

    deleteAccount: Promise.method(function() {

      var self = this;

      return orm.transaction(function(trx) {
        var opts = {transacting: trx};
        return self.destroy(opts);
      });

    })

  }, {

  // Méthodes statiques du modèle User

  // Créer un nouvel utilisateur & initialiser son bot
  register: Promise.method(function(name, email, password) {

    if (!validator.isAlphanumeric(name)) {
      throw new errors.ValidationError('Name must be alphanumeric.');
    }

    if (!validator.isEmail(email)) {
      throw new errors.ValidationError('Incorrect email address.');
    }

    return new Promise(function(fulfill, reject) {

      var rounds = config.get('bcrypt:rounds');

      // On applique un hachage sur le mot de passe et on stocke le résultat
      bcrypt.hash(password, rounds, function(err, hash) {

        if(err) return reject(err);

        var user = new User({
          name: name,
          email: email,
          hash: hash
        });

        // On créait l'utilisateur & on "reset" (initialise dans notre cas) son Bot
        orm.transaction(function(trx) {

          var opts = {transacting: trx};

          return user.save(null, opts)
            .then(function(user) {
              return user.resetBot(opts);
            });

        })
        .then(function(results) {
          var user = results[0];
          fulfill(user);
        })
        .catch(reject);

      });

    });

  }),


  // Authenfication, utilisée par routes/middlewares/basic-auth.js
  login: Promise.method(function(username, password) {

    return new User({name: username})
      .fetch()
      .then(function(user) {
        // Si l'utilisateur existe, on compare le hash avec le mot de passe via bcrypt
        if(user) {
          return new Promise(function(fulfill, reject) {
            bcrypt.compare(password, user.get('hash'), function(err, result) {
              if(err) {
                return reject(err);
              }
              if(result) {
                // Authentification réussie
                return fulfill(user);
              } else {
                // Mot de passe invalide
                return fulfill(false);
              }
            });
          });
        } else {
          return null; // L'utilisateur n'existe pas, on renvoie null
        }
      });

  })

});

orm.model('User', User);

module.exports = User;