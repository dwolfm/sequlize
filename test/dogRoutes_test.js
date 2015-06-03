'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);

describe('dogRoutes.js', function(){
	var dog_obj = {name:'hank', tail_length:32};
	var dog_id = null;
	describe('post to /dog', function(){
		it('should return an object with name hank', function(done){
			chai.request('localhost:3000')
				.post('/api/dog')
				.send(dog_obj) 
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.name).to.eql('hank');
					dog_id = res.body.id;
					done();
				});	
		});
	});
	
	describe('get to /dog/hank', function(){
		it('should return an object with name hank', function(done){
			chai.request('localhost:3000')
				.get('/api/dog/hank')
				.send(dog_obj) 
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.name).to.eql('hank');
					done();
				});	
		});
	});
	
	describe('get to /dog/', function(){
		it('should retern array of length > 0', function(done){
			chai.request('localhost:3000')
				.get('/api/dog/')
				.send(dog_obj) 
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.length).to.be.above(0);
					done();
				});	
		});
	});
		
	describe('put to /dog/hank and update tail_lenth', function(){
		it('should return obj with success == true', function(done){
			chai.request('localhost:3000')
				.put('/api/dog/hank')
				.send({tail_length:85}) 
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.success).to.eql(true);
					done();
				});	
		});
	});
		
	describe('delete /dog/hankid ', function(){
		it('should return obj with success == true', function(done){
			chai.request('localhost:3000')
				.del('/api/dog/' + dog_id)
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.success).to.eql(true);
					done();
				});	
		});
	});

	
	
});
