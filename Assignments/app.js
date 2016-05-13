/**
 * Start : Lab 1 File Operations
 */
var FileOperations = require('./libs/file-operations.js');

var objFileOperations = new FileOperations();

objFileOperations.readFile(function(data) {
  objFileOperations.createTextOutput(data);
  objFileOperations.createXmlOutput(data);
}, function(err) {
  console.log(err);
});

/**
 * Start : Lab 2 Async Operations series and parallel
 */
var AsyncOperations = require('./libs/asyncOperations.js')
var objAsyncOperations = new AsyncOperations();

objAsyncOperations.doSeries();
objAsyncOperations.doParallel();

/**
 * Start : Lab 3
 * Create Http Express server
 * Integrate logging module - Logging module winston is integrated in file-operations.js
 *
 */
var express = require('express');
var app = express();
//app.listen(3001);

/**
 * Start : Lab 4
 * Create GET API in node js
 */
app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/user/:name', function(req, res) {
  console.log(req.params.name);
  res.send('{"id":1, "name":"Matt", "band":"BBQ Brawlers"}');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

/**
 * Start : Lab 5
 * mongodb connection
 * APIs in node js
 */
var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/noderest';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});
require('./models/musician');
require('./routes.js')(app);
