const slugify = require('slugify');
const category = require('../models/category');
const Category = require('../models/category')

let createCategory = (categories,parentId = null) =>{

    const categoryList = [];
    let category;
    if(parentId === null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate._name,
            slug:cate.slug,
            children: createCategory(categories , cate._id)

        });
    }
    return categoryList;

};

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
         

          const categoryList = createCategory(categories)   //reccurtion

            res.status(200).json({categoryList}); 
        } 
    })

}