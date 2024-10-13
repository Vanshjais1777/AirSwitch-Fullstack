const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { sendOtpToEmail } = require('../services/emailService');

// Send OTP to user's email
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Email not found' });
    }

    // Generate OTP and set expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP via email
    try {
        await sendOtpToEmail(email, otp);
        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP' });
    }
};

// Reset password after OTP verification
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Ensure both stored and entered OTP are strings
    const enteredOtp = otp.toString();
    const storedOtp = user.otp ? user.otp.toString() : '';

    // Check if OTP is expired before comparing
    if (user.otpExpires < Date.now()) {
        return res.status(400).json({ message: 'OTP expired' });
    }

    // Compare the entered OTP with the stored OTP
    if (storedOtp !== enteredOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear OTP fields
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    // Save the updated user and check if changes were saved
    const savedUser = await user.save();
    if (!savedUser) {
        return res.status(500).json({ message: 'Error saving user data' });
    }

    res.status(200).json({ message: 'Password reset successful' });
};

