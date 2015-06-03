'use strict';

var bodyparser = require('body-parser');
var Dog = require('../model/dog.js');
var Sqlize = require('sequelize');
var sqlize = new Sqlize('cats_vs_dogs', 'kitty_dev', '1234',
	{ dialect: 'postgres'});


module.exports = function(router) {
	router.use(bodyparser.json());
	
	router.post('/dog', function(req, res) {
		sqlize.sync()
		.then(function(){
			Dog.create(req.body)
				.then(function(data) {
					res.json(data);
				})
		})
		.error(function(err) {
			console.log(err);
			res.status(500).json({msg: 'internal server err'});
		});
	});

	router.get('/dog/:name', function(req, res){
		var _name_ = req.params.name;
		sqlize.sync()
			.then(function(){
				Dog.find({where : {name: _name_}})
					.then( function(data){
						console.log(data);
						res.json(data.dataValues);
					})
					.error( function(err){
						if (err) console.log(data);
						res.json({msg: "error fetching data"});
					});
					
				});
	});

	router.get('/dog/', function(req, res){
		sqlize.sync()
			.then(function(){
				Dog.findAll()
					.then( function(data){
						res.json(data);
					})
					.error( function(err){
						if (err) console.log(data);
						res.json({msg: "error fetching data"});
					});
					
				});
	});

	router.put('/dog/:name', function(req, res){
		var _name_ = req.params.name;
		sqlize.sync()
			.then(function(){
				Dog.update(req.body, {where: {name: _name_}})
					.then( function(data){
						res.json({success: true});
					})
					.error( function(err){
						if (err) console.log(data);
						res.json({msg: "error updateing data"});
					});
				});
	});

	router.delete('/dog/:id', function(req, res){
		var _id_ = req.params.id;
		sqlize.sync()
			.then(function(){
				Dog.destroy({where: {id: _id_}})
					.then( function(data){
						res.json(data === 1 ? {success:true}: {success: false});
					})
					.error( function(err){
						if (err) console.log(data);
						res.json({msg: "error deleteing data"});
					});
				});
	});
};
