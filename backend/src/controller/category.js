const slugify = require('slugify');
const Category = require('../models/category')


 exports.addCategory = (req,res)=>{

    const CategoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.body.parentId){
        CategoryObj.parentId = req.body.parentId;
}
const cat = new Category(CategoryObj);
cat.save((err,category)=>{
if(err) return res.status(401).json({err});
if(category) return res.status(201).json({category})
})
}

exports.getCategory = (req,res)=>{
    Category.find({}).exec((err,categories)=>{
        if(err) return res.status(400).json({err}); 
        if(categories){
            res.status(200).json({categories}); 
        } 
    })

}