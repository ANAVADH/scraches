const express = require('express');

const { signup, signin} = require('../controller/user');
const route = express.Router();
const{validator, validated, validateSignin} = require('../Validator/Validator')

route.post('/signup',validator,validated,signup)

route.post('/signin', validateSignin,validated,signin)

// route.post('/profile',requireSignIn,(req,res)=>{
//     res.status(200).json({user:"profile"})
// })
module.exports = route
