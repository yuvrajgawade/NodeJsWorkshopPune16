var async1 = require('async');
var FileOperations = require('./file-operations.js');

var objFileOperations = new FileOperations();

var AsyncOperations = function () {

};

AsyncOperations.prototype.doSeries = function () {
  console.log("Inside doSeries...");
  async1.series([
    function(callback) {
      objFileOperations.readFile(function(data) {
        objFileOperations.createTextOutput(data);
      });
      callback();
    },
    function(callback) {
      objFileOperations.readFile(function(data) {
        objFileOperations.createXmlOutput(data);
      });
      callback();
    }
  ], function() {
      console.log('doSeries opertion completed!!!');
  });
};

AsyncOperations.prototype.doParallel = function () {
  console.log("Inside doParallel...");
  async1.parallel([
    function(callback) {
      objFileOperations.readFile(function(data) {
        objFileOperations.createTextOutput(data);
      });
      callback();
    },
    function(callback) {
      objFileOperations.readFile(function(data) {
        objFileOperations.createXmlOutput(data);
      });
      callback();
    }
  ], function() {
    console.log('doParallel opertion completed!!!');
  });
};

module.exports = AsyncOperations;
