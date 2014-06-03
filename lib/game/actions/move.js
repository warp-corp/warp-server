/* jshint node: true */
module.exports = {
    
  // Doit retourner le délai en tours avant l'exécution de l'action
  getDelay: function() {
    return 1;
  },

  // Valide les paramètres associés à l'action
  validate: function(params) {
    // TODO validation des paramètres de l'action "move"
    return true;
  },

  // Exécute l'action
  execute: function(bot, params, done) {
    // TODO tester la validité de l'action et l'executer
    // TODO créer le secteur s'il n'existe pas
    // 
    var mongoose = require('mongoose');
    var Sector = mongoose.model('Sector');
    switch (params.dir) {
      case "N" : 
        bot.coords.y += 1;
        break;
      case "S" : 
        bot.coords.y -= 1;
        break;
      case "W" : 
        bot.coords.x -= 1;
        break;
      case "E" : 
        bot.coords.x += 1;
        break;
      case "NE" : 
        bot.coords.x += 1;
        bot.coords.y += 1;
        break;
      case "SE" : 
        bot.coords.x += 1;
        bot.coords.y -= 1;
        break;
      case "SW" : 
        bot.coords.x -= 1;
        bot.coords.y -= 1;
        break;
      case "NW" : 
        bot.coords.x -= 1;
        bot.coords.y += 1;
        break;
      default: break;
    }

    var cond = {
      "coords.x": bot.coords.x,
      "coords.y": bot.coords.y
    }
    Sector.findOne(cond, function(err, sector) {
      if (err)
        return res.send(err);
      
      if (sector == null) {
        var newSector = new Sector({
          coords : {
            "x" : bot.coords.x,
            "y" : bot.coords.y
          },
          authorized_fight: true
        });
        newSector.save(function(err) {
          if (err)
            return console.log(err);
        });
      }
    });
    
    bot.save(function(err) {
      if (err)
        return res.send(err)
      
      console.log('Execute move for bot', bot._id, 'with params', params);
      return done();
    });
  }

};