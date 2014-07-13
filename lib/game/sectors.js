var Noise = require('noisejs').Noise;
var config = require('../util/config');

var SEED = config.get('game:sectors:seed');
var MAX_ALTITUDE = config.get('game:sectors:maxAltitude');

// Initialisation du générateur de bruit à partir de la seed du fichier de configuration
var noise = new Noise();
noise.seed(SEED);

// Initialisation des différents "biotopes"
var biotopes = {
  mountains: {
    priority: 5,
    test: function(x, y, altitude) {
      return altitude > 0.8*MAX_ALTITUDE;
    }
  },
  hills: {
    priority: 5,
    test: function(x, y, altitude) {
      return altitude >= 0.4*MAX_ALTITUDE && altitude < 0.8*MAX_ALTITUDE;
    },
  },
  water: {
    priority: 10,
    test: function(x, y, altitude) {
      return altitude < 0.05*MAX_ALTITUDE;
    },
  },
  plains: {
    priority: 10,
    test: function(x, y, altitude) {
      return altitude >= 0.05*MAX_ALTITUDE && altitude < 0.4*MAX_ALTITUDE;
    }
  },
  swamps: {
    priority: 20,
    test: function(x, y, altitude) {
      var couldBePlains = biotopes.plains.test(x, y, altitude);
      if(couldBePlains) {
        var neighbors = exports.getSectorNeighbors(x, y);
        var hasWater = neighbors.some(function(n) {
          if(n.x === x || n.y === y) {
            var nAltitude = exports.getSectorAltitude(n.x, n.y);
            return biotopes.water.test(n.x, n.y, nAltitude);
          } else {
            return false;
          }
        });
        return hasWater;
      }
      return false;
    }
  }
};

exports.getSector = function(x, y) {
  var sector = {
    x: x,
    y: y,
    altitude:  exports.getSectorAltitude(x, y),
  };
  sector.type = exports.getSectorType(sector.x, sector.y, sector.altitude);
  return sector;
};

exports.getSectorAltitude = function(x, y) {
  return (Math.abs(noise.perlin2(x/15, y/15)) * MAX_ALTITUDE) | 0;
}

exports.getSectorType = function(x, y, altitude) {
  var available = Object.keys(biotopes).filter(function(type) {
    return biotopes[type].test(x, y, altitude);
  });
  return available.sort(exports.getPriorType).reverse()[0] || 'unknown';
}

exports.getPriorType = function(typeA, typeB) {
  var priorityA = biotopes[typeA].priority || 0;
  var priorityB = biotopes[typeB].priority || 0;
  if(priorityA > priorityB) return 1;
  if(priorityA < priorityB) return -1;
  return 0;
}

exports.getSectorNeighbors = function(x, y)  {
  var sectors = [];
  for(var i = -1; i <= 1; ++i) {
    for(var j = -1; j <= 1; ++j) {
      if(!(i === 0 && j === 0)) {
        sectors.push({
          x: x+i, y: y+j
        });
      }
    }
  }
  return sectors;
};
