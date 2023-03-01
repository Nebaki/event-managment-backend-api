const User =require('../models/user');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require("../utils/jsonToken");
const ErrorHandler = require("../utils/errorHandler");


//Register user   =>/api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { UserName, PhoneNumber, password } = req.body;
  
    const user = await User.create({
       
        UserName,
      PhoneNumber,
      password,
      
    });
    res.status(201).json({
        user,
        sucess:'nice work',
    })
  
    // sendToken(user, 200, 'success');

    
  });

  



  //Login user =>/api/v1/login

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { PhoneNumber, password } = req.body;
  
    //check if email and password entered by the user
    if (!PhoneNumber || !password) {
      return next(new errorHandler("Please enter email and password", 400));
    }
  
    //Finding the user in database
    const user = await User.findOne({ PhoneNumber }).select("+password");
    if (!user) {
      return next(new errorHandler("Invalid phone or Password", 401));
    }
  
    //check if password is correct
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new errorHandler("Invalid Email or Password", 401));
    }

    res.status(201).json({
        user,
        sucess:'Logged in',
    })
    // sendToken(user, 200, res);
  });