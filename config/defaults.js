
// Server settings
exports.server = {
  port: 8080,
  host: 'localhost',
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