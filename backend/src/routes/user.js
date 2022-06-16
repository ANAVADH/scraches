const express = require('express');
const { signup, signin, requireSignIn } = require('../controller/user');
const route = express.Router();

route.post('/signup',signup)

route.post('/signin',signin)

route.post('/profile',requireSignIn,(req,res)=>{
    res.status(200).json({user:"profile"})
})
module.exports = route
