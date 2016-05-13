var fs = require('fs');
var xmlBuilder = require('xmlbuilder');
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'app.log' })
    ]
  });

var OUTPUT_TEXT_FILE_PATH = 'output/output.txt';
var OUTPUT_XML_FILE_PATH = 'output/output.xml';

var FileOperations = function () {

}

FileOperations.prototype.readFile = function (successCB, errorCB) {
  logger.log('info', 'Inside readFile...');
  fs.readFile('input/source.json', function (err, data) {
     if (err) {
         errorCB(err);
     }
     successCB(JSON.parse(data.toString()));
  });
}

FileOperations.prototype.createTextOutput = function (data) {
    var obj, records = 'Id|First Name|Last Name|Score \n';
    for( var i=0; i<data.students.length ; i++ ) {
      obj = data.students[i];
      records += obj.id+'|'+obj.fName+'|'+obj.lName+'|'+obj.score+'\n';
    }
    fs.writeFile(OUTPUT_TEXT_FILE_PATH, records, function (err) {
      if(err) {
        return logger.log('error', err);
      }
      logger.log('info', "output.txt file created successfully!!!");
    });
}

FileOperations.prototype.createXmlOutput = function (data) {
    var root = xmlBuilder.create('students'),
        obj;
    for( var i=0; i<data.students.length ; i++ ) {
      obj = data.students[i];

      var item = root.ele('student').att('id', obj.id);
      item.ele('name', obj.fName+' '+obj.lName);
      item.ele('score', obj.score);
    }
    fs.writeFile(OUTPUT_XML_FILE_PATH, root, function (err) {
      if(err) {
        return logger.log('error', err);
      }
      logger.log('info', "output.xml file created successfully!!!");
    });
}

module.exports = FileOperations;
