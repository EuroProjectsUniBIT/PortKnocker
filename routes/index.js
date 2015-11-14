var express = require('express');
var router = express.Router();
var ping = require('ping');
var net = require('net');
var client = new net.Socket();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/ping', function(req, res, next) {
  var host = req.query.ip;
  ping.sys.probe(host, function(isAlive) {
    // var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
    var msg = {
      host: host,
      alive: isAlive
    };
    res.json(msg);
  });
});

router.get('/tcp', function(req, res, next) {
  var ip = req.query.ip;
  var port = req.query.port;
  client.connect(port, ip, function() {
    // console.log('Connected');
    // client.write('Hello, server! Love, Client.');

    client.destroy();
    // res.send('Request sent');
  });
  client.on('error', function(err) {
    // console.log('Error: ' + err);
    client.destroy();
  });
  res.send('ok');
});



module.exports = router;
