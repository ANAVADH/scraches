const Product = require('../models/product')
const shortid = require('shortid')
const slugify = require('slugify')

 exports.createProduct = (req,res) =>{
// res.status(200).json({file:req.files,body:req.body})

const {name,price,describtion,category,createdBy,quantity} = req.body;     //destructuring
let productPictures = [];
if(req.files.length > 0 ){


 productPictures = req.files.map(file =>{
    return {img: file.file.location}
   })

}

const product = new Product({
    name:name,
    slug:slugify(name),
    price,
    describtion,
    productPictures,
    quantity,
    category,
    createdBy:req.user._id
});

product.save(((err,product)=>{
    if(err) return res.status(400).json({err});
    
    if(product){
        res.status(200).json({product})
    }
}))

}