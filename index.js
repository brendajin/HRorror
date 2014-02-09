var express = require('express'),
	app = express(),
	timeout = require('./timeout');

timeout.init();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.send(body);
});


app.listen(3001);