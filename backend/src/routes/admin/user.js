const express = require('express');
const { signup, signin} = require('../../controller/admin/user');
const route = express.Router();

route.post('/admin/signup',signup)

route.post('/admin/signin',signin)


module.exports = route
