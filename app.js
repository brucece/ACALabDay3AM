/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com

var express = require('express');
var bodyParser = require('body-parser'); // parser for post requests
var fs = require('fs');
var path = require('path');
var request = require('request');
//var port = 3000;


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


module.exports.app = app;

require('./service/nlClassifier.js');
require('./service/nlUnderstanding.js');


module.exports = app;

app.listen(appEnv.port, '0.0.0.0',function() {
  // eslint-disable-next-line
  console.log('Server running on' + appEnv.url);
});
/*// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});*/