const Event =require('../models/event');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require("../utils/errorHandler");
const dateFns = require('date-fns');
const APIfeatures=require("../utils/apiFeatures");

//get single  Event using ID from databse /api/v1/event/:ID
exports.getSingleEvent = catchAsyncError(async (req, res,next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("The event with the given id was not found!",404))
    
  }
  res.status(200).json({
    success: true,
    event,
  });
});


//Search   Events using ID from databse /api/v1/event/:ID
exports.serachEvents = catchAsyncError(async (req, res,next) => {

  var q=req.query.q;
  //Partial text search using $text

   Event.find({
    eventName:{
      $regex:new RegExp(q)
    }
  },{
    _id:0,
    __v:0
  },function (err,data){
    res.json(data);
  }).limit(10);

});


// Add a new Event entity into the database =>/api/v1/event/new

exports.addEvent = catchAsyncError(async (req, res, next) => {
    // const { eventName, owner, eventDescription, eventCategory, 
    //         eventType, eventLocation, startDateTime, 
    //         endDateTime, imageUrl} = req.body;
    // const event = await Event.create({     
    //   eventName,
    //   owner,
    //   eventDescription,
    //   eventCategory,
    //   eventType,
    //   eventLocation,
    //   startDateTime,
    //   endDateTime,
    //   imageUrl
    // });
    const event = await Event.create(req.body);
    res.status(201).json({
    succes:true,
    event
  })

    
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


// get all events =>/api/v1/events
exports.getEvents=catchAsyncError(async (req, res) => {
  const apifeatures=new APIfeatures(Event.find(),req.query).Search()

  const events = await apifeatures.query;

  res.status(200).json({
    succes:true,
    count: events.length,
    events
  })
})
