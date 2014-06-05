
// Server settings
exports.server = {
  port: 8080,
  host: 'localhost'
};

// Request rate limiting
exports.rateLimit = {
  rate: 1,
  every: 'second' // 'second', 'minute', 'hour' ou nombre de millisecondes
};

// Database settings
exports.database = {
  uri: 'mongodb://localhost/warp',
  options: {
    server: {
      auto_reconnect: true
    }
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