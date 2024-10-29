const express = require('express');
const { sendOtp, resetPassword, signup, login, addMaster, registerMaster, fetch_master } = require('../controllers/authController');

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Route to send OTP
router.post('/send-otp', sendOtp);

// Route to reset password
router.post('/reset-password', resetPassword);

// Route to add master on master page
router.post('/add-master', addMaster);

// Route to Register master to the backend by admin
router.post('/register-master', registerMaster);

router.get('/fetch-master',fetch_master);

module.exports = router;