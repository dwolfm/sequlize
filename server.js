var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'this are my test secrete';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/cats_dev');

require('./lib/passport_strat')(passport);

var catRouter = express.Router();
require('./lib/catRoutes.js')(catRouter);
app.use('/api', catRouter);

var dogRouter = express.Router();
require('./lib/dogRoutes.js')(catRouter);
app.use('/api', dogRouter); 

function fourOhfour(req, res){
	res.status(404).msg({"msg": "fourOhfour"});
}

app.use(function(req, res, next){
	res.status(404).send('fourOhfour not found');	
	next();
});

app.listen(process.env.PORT || 3000, function(){
	console.log('starting the server');
});


