const mongoose=require('mongoose');
const eventSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    eventName:{
        type:String,
        required:[true,"Please enter the Event name"],
    },
    eventDescription:{
        type:String,  
    },
    eventCategory:{
        type: String,
        required:[true,"Please select the Event Category"],
    },
    fees:{
        type:String,  
    },
    location:{
        type:String,  
        required:[true,"Please enter the Event location"],
    },
    startDateTime:{
        type: Date,
        required:[true,"Please specify the date and time where the event will start"],
    },
    endDateTime:{
        type: Date,
        required:[true,"Please specify the date and time where the event will end"],
    },
    avatar: {
        type: String,
      },
    cloudinary_id: {
        type: String,
      },
    travlers:{
        type:Number
      },
    createdAt:{
        type: Date,
        default: Date.now
    }
    })
 
    module.exports=mongoose.model('Event',eventSchema);



   