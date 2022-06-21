 const User = require('../models/user')
 const jwt = require('jsonwebtoken')
 const SECKEY = process.env.JWT_SECKEY
 // creating users 
 exports.signup = (req,res)=>{
User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user)
            return res.status(400).json({
                message : "user alredy exist"
            });
            const {firstName,lastName,email,password} = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username:Math.random().toString()
            });
               
            _user.save((err,data)=>{
                if(data){
                    res.status(201).json({
                        message:"User Created Successfully"
                    })
                }
                if(err){
                    res.status(400).json({
                        message:"something went wrong"
                    })
                }
             })
        });
     }
     //signin authentication using jwt

exports.signin = (req,res)=>{
   
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(err) return res.status(400).json({err}) 
        if(user){
            if(user.authenticate(req.body.password)){
                        
            const token = jwt.sign({_id:user._id, role:user.role},SECKEY,{expiresIn:"1h"})
            const {_id,firstName,lastName,email,role,fullName} = user
                 res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,email,role,fullName
                 }
                 });    
                 
        
        }else{
            return res.status(400).json({
                message:"invalid password"
            })
        }

        }else{
            return res.status(400).json({message:"something Went Wrong"})
        }
    })

}

