const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
name:{
        type:String,
        required: true,
        trim:true
    },
slug:{
        type:String,
        required: true,
        unique:true
    },
parentId:{
    type:String
},
price:{
    type:Number,
    required:true
},
describtion:{
    type:String,
    required:true,
    trim:true
},
offer:{
    type:Number
},
productPictures:[{img:{type:String}}],
reviews:[{
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    review: String
}],
quantity:{
    type: Number,
    required:true
},
category:{type: mongoose.Schema.Types.ObjectId, ref:'Category'},
createdBy:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
updatedAt:Date

},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)      //exporting multer...!