const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/multer");

const { getTodayEvents, getThisWeekEvents, getThisMonthEvents ,getSingleEvent,getEvents,serachEvents} = require("../controllers/eventController");

router.route(`/events/today`).get(getTodayEvents);
router.route(`/events/this-week`).get(getThisWeekEvents);
router.route(`/events/this-month`).get(getThisMonthEvents);
// search
router.route(`/events?keyword=`).get(getEvents);

router.route(`/events`).get(getEvents);
router.route("/event/:id").get(getSingleEvent);



router.post("/", upload.single("image"),async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let event = new Event({
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventCategory:req.body.eventName,
        fees:req.body.fees,
        location:req.body.location,
        startDateTime:req.body.startDateTime,
        endDateTime:req.body.endDateTime,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
        travlers:req.body.travlers,
    });
    await event.save();
    res.json({
        success: true,
        events: event
    });
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;