const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        maxLength:[30,"First name cannot exceed 30 characters"],
    },
    lastName:{
        type:String,
        maxLength:[30,"Last name cannot exceed 30 characters"],
    },
    phoneNumber:{
        type:String,
        unique:true,
        required:true  
    },
    email:{
        type:String, 
    
    },
    image:{
        type:String,
            // required:true,
    },
    gender:{
        type:String,
    
    },
    profession:{
        type:String,
    
    },
    age:{
        type:Number,
    
    },
    createdAt:{
        type: Date,
            default: Date.now
    },
    },{
        timestamps:true 
    })


    //Return jwt token   
userSchema.methods.getJwtToken=function() {
    return jwt.sign({id:this.id,},process.env.JWT_SECRETE,{
        expiresIn: process.env.JWT_SECRETE_EXPIRATION_TIME
    });
}

 

    module.exports=mongoose.model('User',userSchema);