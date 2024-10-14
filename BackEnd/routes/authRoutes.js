const express = require('express');
const { sendOtp, resetPassword,signup, login } = require('../controllers/authController');

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Route to send OTP
router.post('/send-otp', sendOtp);

// Route to reset password
router.post('/reset-password', resetPassword);

module.exports = router;