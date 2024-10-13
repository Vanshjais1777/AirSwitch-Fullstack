// authController.js
const User = require('../models/userModel'); // Import your User model
const { sendOtpToEmail } = require('../services/emailService'); // Adjust the import based on your folder structure
const { generateOtp, saveOtpToUser } = require('../utils/errorHandler'); // Assuming you have these utilities

exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate OTP
        const otp = generateOtp(); // Implement this function to generate a random OTP

        // Save OTP to user (you might want to save it in the User model or a separate model)
        await saveOtpToUser(user.id, otp); // Implement this function

        // Send OTP email
        await sendOtpToEmail(email, otp); // Your email sending function

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Error sending OTP:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error sending OTP' });
    }
};
