const jwt = require('jsonwebtoken')
const SECKEY = process.env.JWT_SECKEY


exports.requireSignIn = (req,res,next)=>{

if(req.headers.authorization){


    const token = req.headers.authorization.split('')[1];
    const user = jwt.verify(token,SECKEY)
    req.user = user;
    next();

}
return res.status(400).json({message:"Authorization required"})

}

exports.userMiddleware = (req,res,next) =>{

}

exports.adminMiddleware = (req,res,next) =>{
      if(req.user.role !== 'admin'){
        res.status(400).json({message: 'Access denied'})
      }
      next();
}