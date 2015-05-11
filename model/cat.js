'use strict';

var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	origin: String,
	powers: {
		mental: [],
		physical: []
	},
	isEvil: Boolean
});

module.exports mongoose.model('User', catSchema);
