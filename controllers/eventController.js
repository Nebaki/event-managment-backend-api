const Event =require('../models/event');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require("../utils/errorHandler");
const dateFns = require('date-fns');
const APIfeatures=require("../utils/apiFeatures");
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/multer");





exports.addEvent = catchAsyncError(async (req, res, next) =>{

try {
  upload.single('image');
  const result = await cloudinary.uploader.upload(req.file.path);

  // Create new user
  let event = new Event({
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    eventCategory: req.body.eventCategory,
    eventType: req.body.eventType,
    eventLatitude: req.body.eventLatitude,
    eventLongtitude: req.body.eventLongtitude,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    avatar: result.secure_url,
    cloudinary_id: result.public_id,
  });
  // Save user
  await Event.save();
  res.json(event);
} catch (err) {
  console.log(err);
}


})



 

// Add a new Event entity into the database =>/api/v1/event/new

// exports.addEvent = catchAsyncError(async (req, res, next) => {
//   upload(req,res,(err)=>{
//     if(err){
//       console.log(err)
//     }else{
    //   const event = new Event({
    //     eventName: req.body.eventName,
    // eventDescription: req.body.eventDescription,
    // eventCategory: req.body.eventCategory,
    // eventType: req.body.eventType,
    // image:{
    //   data:req.file.image, 
    //   ContentType:'image/png'
    // },
    // eventLatitude: req.body.eventLatitude,
    // eventLongtitude:req.body.eventLongtitude,
    // startDateTime: req.body.startDateTime,
    // endDateTime: req.body.endDateTime
    //   });
      
      

//       event.save().then(()=>res.send('succefully added')).catch((err)=>console.log(err))


//     }
//   })
   

    
//   });


//get single  Event using ID from databse /api/v1/event/:ID
exports.getSingleEvent = catchAsyncError(async (req, res,next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("The event with the given id was not found!",404))
    
  }
  res.status(200).json({
    event,
  });
});




  
//get today's events  =>/api/v1/events/today
exports.getTodayEvents = catchAsyncError(async (req, res) => {
   const eventList = await Event.find({
    startDateTime: {
      $gte: new Date(new Date().setHours(00, 00, 00)),
      $lt: new Date(new Date().setHours(23, 59, 59)),
    },
   });

    res.status(201).json({
        eventList,
    })

  });

// get this week's events  =>/api/v1/events/this-week
exports.getThisWeekEvents = catchAsyncError(async (req, res) => {

  const eventList = await Event.find({
   startDateTime: {
     $gte: dateFns.startOfWeek(new Date(), {weekStartsOn: 1}),
     $lt: dateFns.endOfWeek(new Date(), {weekStartsOn: 1}),
   },
  });

   res.status(201).json({
       eventList,
   })

 });


// get this month Event  =>/api/v1/events/this-month
exports.getThisMonthEvents = catchAsyncError(async (req, res) => {

  const eventList = await Event.find({
   startDateTime: {
     $gte: dateFns.startOfMonth(new Date(), {weekStartsOn: 1}),
     $lt: dateFns.endOfMonth(new Date(), {weekStartsOn: 1}),
   },
  });

   res.status(201).json({
       eventList,
   })


 });


// get all events and search =>/api/v1/events
exports.getEvents=catchAsyncError(async (req, res) => {
  const apifeatures=new APIfeatures(Event.find(),req.query).Search().Filter();
  const events = await apifeatures.query ;

  res.status(200).json({
    count: events.length,
    events
  })
})
