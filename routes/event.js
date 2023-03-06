const express = require("express");
const { addEvent, getTodayEvents, getThisWeekEvents, getThisMonthEvents } = require("../controllers/eventController");
const router = express.Router();

router.route(`/event/new`).post(addEvent);
router.route(`/events/today`).get(getTodayEvents);
router.route(`/events/this-week`).get(getThisWeekEvents);
router.route(`/events/this-month`).get(getThisMonthEvents);

module.exports = router;