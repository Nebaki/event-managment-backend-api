const express = require("express");
const router = express.Router();

const { addEvent, getTodayEvents, getThisWeekEvents, getThisMonthEvents ,getSingleEvent,getEvents,serachEvents} = require("../controllers/eventController");
router.route(`/event/new`).post(addEvent);
router.route(`/events/today`).get(getTodayEvents);
router.route(`/events/this-week`).get(getThisWeekEvents);
router.route(`/events/this-month`).get(getThisMonthEvents);
// search
router.route(`/events?keyword=`).get(getEvents);
router.route(`/events`).get(getEvents);


router.route("/event/:id").get(getSingleEvent);




module.exports = router;