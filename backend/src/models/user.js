const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
firstName:{
type:string,
required:true,
trim:true,
min:3,
max:20
},
lastName:{
    type:string,
    required:true,
    trim:true,
    min:1,
    max:20
    },
username:{
    type:string,
    required:true,
    trim:true,
    index:true,
    lowercase:true,
    unique:true 
},
emial:{
    type:string,
    unique:true,
    required:true,
    trim:true,
    lowercase:true
},
hash_password:{
    type:string,
    required:true
},
role:{
    type:string,
    enum:['user','admin'],
    default:'admin'
},
contactNumber:{type:string},
profilePicture:{type:string}

},{timestamps:true})


userSchema.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
})

userSchema.methords = {
    authenticate: function(password){
        return bcrypt.compare(password,this.hash_password)
    }
}


module.exports = mongoose.model('user',userSchema)