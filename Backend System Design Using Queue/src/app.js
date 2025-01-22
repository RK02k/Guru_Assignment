// src/app.js
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://raj02kashyap:PaPTQ30yP6dhdOo1@graj.pk2pq.mongodb.net/?retryWrites=true&w=majority&appName=Graj`
)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', userRoutes);
app.use('/queue', queueRoutes);

module.exports = app;  // Export the app