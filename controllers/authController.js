const User =require('../models/user');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require("../utils/jsonToken");
const ErrorHandler = require("../utils/errorHandler");


//Register user via phone number  =>/api/v1/phone_register
exports.phoneRegister = catchAsyncError(async (req, res, next) => {
    const { userName, phoneNumber} = req.body;
  
    const user = await User.create({     
      userName,
      phoneNumber,
    });

    res.status(201).json({
        user,
        message:'User Registered Succesfully',
    })
  
    // sendToken(user, 200, 'success');

    
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
    // sendToken(user, 200, res);
  });
