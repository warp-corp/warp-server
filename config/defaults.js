
exports.server = {

  name: 'Warp',
  version: 'v0.0.0',
  port: 8080,

  throttle: {
    burst: 100,
    rate: 50,
    ip: true,
    overrides: {
      '127.0.0.1': {
        rate: 0,        // unlimited
        burst: 0
      }
    }
  }


};

exports.database = "mongodb://localhost/warp";

exports.logger = {
  name: "Warp"
};
