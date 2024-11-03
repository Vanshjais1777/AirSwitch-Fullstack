const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const connectDB = require('./config/db')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173'], // local frontend and admin frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true,
}));

app.options('*', cors());

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});


app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});