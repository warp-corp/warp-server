
exports.getInfo = function(req, res) {
  res.send({hello: 'player'});
};

exports.register = function(req, res) {
  res.send({hello: 'register'});
};

exports.erase = function(req, res) {
  res.send({hello: 'erase'});
};