var mongoose = require('mongoose');
var express = require('express');

var app = express();
var routes = express.Router();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/cats_dev');

app.listen(process.env.PORT || 3000, function(){
	console.log('starting the server');
});

