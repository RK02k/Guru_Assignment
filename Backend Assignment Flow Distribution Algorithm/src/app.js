const express = require('express');
const app = express();
const flowRoutes = require('./routes/flowRoutes');

app.use(express.json());
app.use('/flow', flowRoutes);

module.exports = app;