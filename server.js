// ===========================
// server
// ===========================

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});


// ===========================
// routes
// ===========================

app.get('/', function (request, response) {
  response.send('Hi there');
});

// 'get' is the express method for the getter or GET request

