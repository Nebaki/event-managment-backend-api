const express = require("express");
const { Register, checkPhoneNumber ,changeProfile} = require("../controllers/authController");
const router = express.Router();

router.route(`/check`).post(checkPhoneNumber);
router.route(`/register`).post(Register);
router.route(`/changeProfile/:id`).put(changeProfile);

module.exports = router;