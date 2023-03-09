const express = require("express");
const { phoneRegister, checkPhoneNumber } = require("../controllers/authController");
const router = express.Router();

router.route(`/check`).post(checkPhoneNumber);
router.route(`/register`).post(phoneRegister);

module.exports = router;