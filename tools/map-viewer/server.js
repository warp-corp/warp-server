var http = require('http');
var Sector = require('../../lib/models/sector');
var server = http.createServer(requestHandler);

function requestHandler(req, res) {
  Sector.fetchAll()
    .then(function(sectors) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(sectors));
    });
}

server.listen(8081);
