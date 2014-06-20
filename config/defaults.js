
// Server settings
exports.server = {
  port: 8080,
  host: 'localhost'
};

// Hachage du mot de passe
exports.bcrypt = {
  rounds: 12
};

// COnfiguration du jeu
exports.game = {

  // Permet d'appliquer un multiplicateur global sur le temps des cooldowns
  // Utile pour le développement
  cooldownMultiplier: 1,

  // Nombre maximum de modules équipés à un instant T par un Bot
  maxSlots: 10,

  // Actions par défaut accessibles à un Bot
  defaultActions: ['move', 'scanbot']

};

// Request rate limiting
exports.rateLimit = {
  rate: 1,
  every: 'second' // 'second', 'minute', 'hour' ou nombre de millisecondes
};

// Database settings, voir http://knexjs.org/
exports.database = {
  client: 'sqlite3',
  connection: {
    filename: './data.sqlite3'
  }
};

// Logger settings
exports.logger = {
  name: 'Warp',
  level: 'info'
};