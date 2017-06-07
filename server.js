var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(express.static('src'));
app.use(express.static('scripts'));
app.use(express.static('node_modules'));
app.use(express.static(path.join(__dirname, 'templates')));



// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
