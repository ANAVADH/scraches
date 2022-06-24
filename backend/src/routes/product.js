const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
// const { addCategory, getCategory } = require('../controller/category');
const route = express.Router();
const multer = require('multer')
const path = require('path')
const shortid = require('shortid')



// storage engine to control the storing files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

  const upload = multer({storage})


route.post('/product/create',requireSignIn,adminMiddleware,upload.array('productPictures'),createProduct)
// route.get('/category/getcategory',getCategory)


module.exports = route 