const mongoose = require('mongoose')

const postschema = mongoose.Schema({
	title:{
		type:String,
		required:true,
		// unique: true
	},
	authorname:{
		type:String,
		required:true,
		unique: false
	},
	authorid:{
		type:String,
		required:true,
		unique: false
	},
	threadid:{
		type:String,
		required:true,
		unique: true
	},

});

module.exports = mongoose.model('postdata', postschema);