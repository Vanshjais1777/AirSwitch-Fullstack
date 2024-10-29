const User = require('../models/userModel');
const Master = require('../models/masterModel');
const bcrypt = require('bcryptjs');
const { sendOtpToEmail } = require('../services/emailService');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

// User SignUp controller logic
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new User
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Create JWT token
        if (!JWT_SECRET) {
            throw new Error("JWT secret not defined");
        }

        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'User registered successfully',
            token,
            user: { username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.log("Error during signup:", error);  // Log the actual error
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login controller logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Log the password comparison
        // console.log('User Password Hash:', user.password);
        // console.log('Entered Password:', password);
        const isMatch = bcrypt.compare(password, user.password);
        // console.log('Passwords Match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: { username: user.username, email: user.email },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Send OTP to user's email, controller logic
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

// Reset user password after OTP verification, controller logic
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Ensure both stored and entered OTP are strings
    const enteredOtp = otp.toString();
    const storedOtp = user.otp ? user.otp.toString() : 'jhgh';
    // console.log(user.otp);
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

// Add Master to Master page by user, controller logic
// Add Master to Master page by user, controller logic
exports.addMaster = async (req, res) => {
    const { masterid, name } = req.body; // Extract only id and name from request body
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("error " + err);
                return "Error";
            }
            return decoded;
        });
        const email = decoded.email; // Get the email from the decoded token

        // Check if the master with the entered ID exists
        let master = await Master.findOne({ masterid });

        if (!master) {
            return res.status(400).json({
                message: "Master with Entered ID doesn't Exist"
            });
        }

        // If exists then Update name in master model
        master.name = name;
        await master.save();

        // Update the user masterid in user model
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.masterid = [...user.masterid, masterid];
        await user.save();

        return res.status(200).json({
            message: 'Master name updated and user associated successfully',
            master,
            user
        });
    } catch (error) {
        console.error('Error fetching master:', error);
        res.status(500).json({ message: 'Server error while fetching master' });
    }
};


// Register Master in DataBase by admin, controller logic
exports.registerMaster = async (req, res) => {
    const { masterid } = req.body;

    try {
        // Check for existing master
        const existingMaster = await Master.findOne({ masterid });
        if (existingMaster) {
            return res.status(400).json({ message: "Master already exists with entered ID" });
        }

        // Create a new master
        const master = new Master({
            masterid,
        });

        await master.save();
        res.status(200).json({ message: 'Master with entered ID added successfully', master })
    } catch (error) {
        res.status(500).json({ message: 'Error adding master', error: error.message });
    }
};

exports.fetch_master = async (req, res) => {

    //fetching master
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("error " + err);
                return "Error";
            }
            return decoded;
        });

        const email = decoded.email; // Get the email from the decoded token
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let masters = await Promise.all(user.masterid.map(async (id) => {
            const master = await Master.findOne({ masterid: id });
            return master ? { name: master.name, masterid: master.masterid } : null; // Return null if master is not found
        }));
        console.log(masters);

        // Filter out any `null` values in case some `masterid`s don't have corresponding Master records
        masters = masters.filter(master => master !== null);
        return res.status(200).json(masters);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
}