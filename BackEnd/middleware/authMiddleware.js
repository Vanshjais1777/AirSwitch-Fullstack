// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Should be same as in your controller

exports.protect = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};