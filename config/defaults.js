
// Server settings
exports.server = {
  port: 8080,
  host: 'localhost'
};

// Hachage du mot de passe
exports.bcrypt = {
  rounds: 12
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

// Ticker settings
exports.ticker = {
  interval: 5000
};