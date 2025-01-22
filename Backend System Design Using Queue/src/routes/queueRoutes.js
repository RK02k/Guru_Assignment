const express = require('express');
const { authenticate } = require('../auth/authMiddleware');
const Queue = require('../models/Queue');
const { processQueue } = require('../queue/worker');

const router = express.Router();

// Enqueue a task for a user
router.post('/enqueue', authenticate, async (req, res) => {
  const { data } = req.body;
  const username = req.user.username;

  try {
    // Find the user's queue or create one if it doesn't exist
    let userQueue = await Queue.findOne({ username });
    if (!userQueue) {
      userQueue = new Queue({ username, tasks: [] });
    }

    // Add a new task to the queue
    userQueue.tasks.push({ data, status: 'pending' });

    // Save the queue and log the result
    const savedQueue = await userQueue.save();
    console.log('Queue saved:', savedQueue);

    // Process the user's queue
    processQueue(username);
    res.json({ message: 'Request added to queue' });
  } catch (error) {
    console.error('Error in enqueue:', error);
    res.status(500).json({ message: 'Failed to enqueue request', error: error.message });
  }
});


// Get all tasks in the queue for the logged-in user (with pagination)
router.get('/queue', authenticate, async (req, res) => {
  const username = req.user.username;
  const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10

  try {
    const userQueue = await Queue.findOne({ username });
    if (!userQueue) {
      return res.status(404).json({ message: 'No queue found for this user' });
    }

    // Paginate tasks
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedTasks = userQueue.tasks.slice(startIndex, endIndex);

    res.json({
      tasks: paginatedTasks,
      totalTasks: userQueue.tasks.length,
      currentPage: parseInt(page),
      totalPages: Math.ceil(userQueue.tasks.length / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve queue', error: error.message });
  }
});

// Delete a specific task from the queue
router.delete('/queue/:taskId', authenticate, async (req, res) => {
  const username = req.user.username;
  const { taskId } = req.params;

  try {
    const userQueue = await Queue.findOne({ username });
    if (!userQueue) {
      return res.status(404).json({ message: 'No queue found for this user' });
    }

    // Remove the task with the matching ID
    const taskIndex = userQueue.tasks.findIndex(task => task._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    userQueue.tasks.splice(taskIndex, 1); // Remove the task
    await userQueue.save();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
});

// Clear all tasks in the user's queue
router.delete('/queue', authenticate, async (req, res) => {
  const username = req.user.username;

  try {
    const userQueue = await Queue.findOne({ username });
    if (!userQueue) {
      return res.status(404).json({ message: 'No queue found for this user' });
    }

    userQueue.tasks = []; // Clear all tasks
    await userQueue.save();

    res.json({ message: 'All tasks cleared from queue' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear queue', error: error.message });
  }
});

module.exports = router;
