
const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategory } = require('../controller/category');
const route = express.Router();



route.post('/category/create',requireSignIn,adminMiddleware,addCategory)
route.get('/category/getcategory',getCategory)


module.exports = route 