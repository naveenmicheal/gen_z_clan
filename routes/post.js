const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi');
const mongoose = require('mongoose')
const postmodel = require('../models/postmodel');

// JOI validation
const schema = Joi.object().keys({
    title:Joi.string().min(2).max(100).trim().required(),
    authorname:Joi.string().min(2).max(100).trim().required(),
    authorid:Joi.string().min(2).trim().max(500),
    threadid:Joi.string().min(2).trim().max(500),
});

router.get('/', (req, res)=>{
	postmodel.find({},(err,result)=>{
		// err ? console.log(err) : console.log(result)
		if(err){
			console.log(err)
			return
		}
		else{
			console.log(result);
			res.json(result)
		}
	})
})

router.post('/add',(req,res)=>{
	const new_post = {
		title:"New Title",
		authorname:"New Author",
		authorid:"7978",
		threadid:"6767"
	}
	const validate = schema.validate(new_post)
	// console.log(validate.error)
	if (validate.error == null){
		console.log(new_post)
		const new_post_obj = new postmodel(new_post)
		new_post_obj.save((err, result)=>{
			if (err){
				res.json({err})
			}
			else{
				res.json(result)
			}
		})
	}
	else{
		res.json(validate.error)
	}
	// res.json("DONE")
})


module.exports = router