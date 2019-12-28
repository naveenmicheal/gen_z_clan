const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi');
const mongoose = require('mongoose')
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');

const rounds = 5;

// JOI validation
const schema = Joi.object().keys({
    username:Joi.string().min(3).max(100).trim().required(),
    name:Joi.string().min(2).max(100).trim().required(),
    email:Joi.string().min(2).trim().max(500).required(),
    password:Joi.string().min(2).trim().max(800).required(),
    info:Joi.string().min(2).trim().max(500).required(),
    created:Joi.date().required()
});



router.post('/signup', (req, res) => {

	bcrypt.hash(req.body.password, rounds, (err, hash) => {
		const new_user = {
			username: req.body.username,
			name: req.body.name,
			email: req.body.email,
			password: hash,
			// created: req.body.created,
			created: new Date(),
			info: req.body.info
		}
		const validate = schema.validate(new_user)
		if (validate.error == null) {
			const new_user_obj = new usermodel(new_user)
			new_user_obj.save((err, result) => {
				if (err) {
					res.json({
						status: "Given infomation already exists"
					})
				} 
				else
				{
					res.json(result)
				}
			})
		}
		else
		 {
			res.json(validate.error)
		}
	})
});


router.post('/login',(req,res)=>{

})

// router.put('/:id',(req,res)=>{
// 	const new_post = {
// 		title:req.body.title,
// 		authorname:req.body.authorname,
// 		authorid:req.body.authorid,
// 		threadid:req.body.threadid
// 	};
// 	// console.log((req.params.id).toString())

// 	let arg = (req.params.id).toString()
// 	const validate = schema.validate(new_post)

// 	if(validate.error == null){
// 		postmodel.update({threadid:{$eq: arg}},new_post,(err,result)=>{
// 			if(err){
// 				res.json({err})
// 			}
// 			else{
// 				res.json(result)
// 			}
// 		})

// 		// postmodel.find({threadid:{$eq : "278"}},(err,resp)=>{
// 		// 	err ? res.json(err) : res.json(resp)
// 		// })

// 		// postmodel.update({"278":"278"},{$set:{new_post}},(err,result)=>{
// 		// 	err ? res.json(err) : res.json(result)
// 		// })
// 	}
// 	else{																			
// 		res.json(validate.error)
// 		}
// });

// router.delete('/:id',(req,res)=>{
// 	let input_id = (req.params.id).toString()
// 	postmodel.deleteOne({threadid:input_id},(err,result)=>{
// 		if(err){
// 			res.json(err)
// 		}
// 		else{
// 			res.json(result)
// 		}
// 	})
// })



module.exports = router