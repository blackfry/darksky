/**
 * This is a simple express server, to show how to proxy weather rquest to DarkSky API.
 */
var express = require('express');
var bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');
var port = 3001;


// Configure app to use bodyParser to parse json data
var app = express();
var server = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test server is working (GET http://localhost:3001/api)
app.get('/api/', function(req, res) {
  res.json({ message: 'Hi, welcome to the server api!' });
});


// Following is an example to proxy client request to DarkSky forecast API
var DARKSKY_SECRET_KEY = 'ebca4aed4cb861f1ce00a32aff04b70c';
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  next();
});
var url_prefix = 'https://api.darksky.net/forecast/'+DARKSKY_SECRET_KEY+'/';
app.get('/api/darksky/:lat/:long', function(req, res) {
try {
    // Retrieves location coordinates (latitude and longitude) from client request query
    var coordinates = req.params.lat+','+req.params.long
    var url = url_prefix + coordinates;
    console.log('Fetching '+url);
    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
            res.status(response.status).json({'message': 'Bad response from Dark Sky server'});
        }
        return response.json();
      })
      .then(function(payload) {
          res.status(200).json(payload);
      });
  } catch(err) {
    console.log("Errors occurs requesting Dark Sky API", err);
    res.status(500).json({'message': 'Errors occurs requesting Dark Sky API', 'details' : err});
  }
});

// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);
