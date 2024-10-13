const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send OTP to the user's email
exports.sendOtpToEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',  // Or any other email service
        auth: {
            user: process.env.EMAIL,         // Your email
            pass: process.env.EMAIL_PASSWORD // Your email password or app password
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Password Reset',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};