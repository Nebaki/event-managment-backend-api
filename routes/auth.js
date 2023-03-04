const express = require("express");
const { phoneRegister, phoneSignin } = require("../controllers/authController");
const router = express.Router();

router.route(`/phone_signin`).post(phoneSignin);
router.route(`/phone_register`).post(phoneRegister);

module.exports = router;