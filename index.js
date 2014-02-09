var express = require('express'),
	app = express(),
	Firebase = require('firebase');

var myRootRef = new Firebase('https://burning-fire-1978.firebaseio.com:443/');
myRootRef.on('child_added', function(snapshot) {
  console.log(snapshot)
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.send(body);
});


app.listen(3001);