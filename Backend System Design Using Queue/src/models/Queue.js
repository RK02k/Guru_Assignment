const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  data: { type: String, required: true },
  status: { type: String, default: 'pending' }, // Add status for tracking
  createdAt: { type: Date, default: Date.now },
});

const queueSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  tasks: [taskSchema], // Define tasks as an array of taskSchema
});

module.exports = mongoose.model('Queue', queueSchema);

