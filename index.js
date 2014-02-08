var express = require('express');
var app = express();


app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});


app.listen(3000);