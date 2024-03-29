const jwt=require('jsonwebtoken')
const catchAsyncError = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User=require("../models/user");


//check if the user is authenticated or not

exports.isAuthenticated=catchAsyncError(async(req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
   if (!token) {
    return next(new ErrorHandler("You must be logged in first",401))
   }
   const decoded=jwt.verify(token,process.env.JWT_SECRETE);
   req.user=await User.findById(decoded.id);
   next();
})


//Handling user role
exports.authorizeRole=(...roles)=>{
    return (req,res,next) => {
        if (!roles.includes(req.user.role)){ 
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403));
            
        }
        next();
        
    }
}