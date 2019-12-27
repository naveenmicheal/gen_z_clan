const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi');
const mongoose = require('mongoose')
const postmodel = require('../models/postmodel');

// JOI validation
const schema = Joi.object().keys({
    username:Joi.string().min(2).max(100).trim().required(),
    name:Joi.string().min(2).max(100).trim().required(),
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
		title:req.body.title,
		authorname:req.body.authorname,
		authorid:req.body.authorid,
		threadid:req.body.threadid
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

router.put('/:id',(req,res)=>{
	const new_post = {
		title:req.body.title,
		authorname:req.body.authorname,
		authorid:req.body.authorid,
		threadid:req.body.threadid
	};
	// console.log((req.params.id).toString())

	let arg = (req.params.id).toString()
	const validate = schema.validate(new_post)

	if(validate.error == null){
		postmodel.update({threadid:{$eq: arg}},new_post,(err,result)=>{
			if(err){
				res.json({err})
			}
			else{
				res.json(result)
			}
		})

		// postmodel.find({threadid:{$eq : "278"}},(err,resp)=>{
		// 	err ? res.json(err) : res.json(resp)
		// })

		// postmodel.update({"278":"278"},{$set:{new_post}},(err,result)=>{
		// 	err ? res.json(err) : res.json(result)
		// })
	}
	else{																			
		res.json(validate.error)
		}
});

router.delete('/:id',(req,res)=>{
	let input_id = (req.params.id).toString()
	postmodel.deleteOne({threadid:input_id},(err,result)=>{
		if(err){
			res.json(err)
		}
		else{
			res.json(result)
		}
	})
})



module.exports = router