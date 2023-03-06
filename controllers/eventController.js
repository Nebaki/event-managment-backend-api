const Event =require('../models/event');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require("../utils/errorHandler");
const dateFns = require('date-fns');


//Add a new Event entity into the database =>/api/v1/event/new
exports.addEvent = catchAsyncError(async (req, res, next) => {
    const { eventName, owner, eventDescription, eventCategory, 
            eventType, eventLocation, startDateTime, 
            endDateTime, imageUrl} = req.body;
  
    const event = await Event.create({     
      eventName,
      owner,
      eventDescription,
      eventCategory,
      eventType,
      eventLocation,
      startDateTime,
      endDateTime,
      imageUrl
    });

    res.status(201).json({
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