var express = require('express');
var app = express();
var Sector = require('../../lib/models/sector');

app.get('/sectors', function(req, res) {
  res.set('Content-Type', 'application/json');
  Sector.fetchAll()
    .then(function(sectors) {
      res.send(sectors);
    });
});

app.use(express.static(__dirname));

app.listen(8081);
