var express = require('express');
var app  = express();
var mongojs = require('mongojs');
var adminDB = mongojs('adminReg',['adminReg']);
var patientDB = mongojs('patientReg',['patientReg']);
var doctorDB = mongojs('doctorReg',['doctorReg']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/api/authenticate',function(req,res){
console.log("i got request");
});

app.listen(8006);
console.log("server started!...")