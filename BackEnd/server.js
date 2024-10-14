const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'  // Allow requests from this origin
}));

app.use(express.json());

const connectDB = require('./config/db')
connectDB();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});