const express = require('express');
const { sendOtp, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOtp);

// Route to reset password
router.post('/reset-password', resetPassword);

module.exports = router;