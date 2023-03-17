const User =require('../models/user');
const Event=require('../models/event')
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require("../utils/jsonToken");
const ErrorHandler = require("../utils/errorHandler");
const jwt =require('jsonwebtoken');


//Register user via phone number  =>/api/v1/phone_register
exports.Register = catchAsyncError(async (req, res, next) => {
    
  const user = await User.create(req.body);
  const token = user.getJwtToken();

    res.status(201).json({
      message:'User Registered Succesfully',
        user,
        token
    })
  
    
    
  });

  
//Checking phone number whether it is registered or not!  =>/api/v1/check
exports.checkPhoneNumber = catchAsyncError(async (req, res, next) => {
    const { phoneNumber } = req.body;
  
    //check if phone number entered by the user is correct
    if (!phoneNumber) {
      return next(new ErrorHandler("Please enter your phone number", 400));
    }
  
    //Finding the user in database
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      res.status(401).json({
        status:false,
        message:'Phone Number not found"',
    })
      // return next(new ErrorHandler("Phone Number not found", 401));
    }
  

    res.status(201).json({
      status:true,
      message:'This Phone Number is found',
      user,
    })
  });


  exports.changeProfile=catchAsyncError(async (req, res, next) => {

    let user = await User.findById(req.params.id);
    if (!user)
  return next(new ErrorHandler("User not found",404));


  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });


  res.status(200).json({ success: true, user });

  })
