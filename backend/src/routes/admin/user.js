const express = require('express');
const { signup, signin} = require('../../controller/admin/user');
const route = express.Router();
const{validator, validated, validateSignin} = require('../../Validator/Validator')

route.post('/admin/signup',validator,validated,signup)

route.post('/admin/signin',validateSignin,validated,signin)


module.exports = route
