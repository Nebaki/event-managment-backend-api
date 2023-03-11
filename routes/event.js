const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/multer");

const { addEvent, getTodayEvents, getThisWeekEvents, getThisMonthEvents ,getSingleEvent,getEvents,serachEvents} = require("../controllers/eventController");
router.route(`/event/new`).post(addEvent);
router.route(`/events/today`).get(getTodayEvents);
router.route(`/events/this-week`).get(getThisWeekEvents);
router.route(`/events/this-month`).get(getThisMonthEvents);
// search
router.route(`/events?keyword=`).get(getEvents);
router.route(`/events`).get(getEvents);


router.route("/event/:id").get(getSingleEvent);



router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

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
        cloudinary_id: result.public_id
    });
    await Event.create();
    res.json(event);
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;