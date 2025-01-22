const Queue = require('../models/Queue');

const processQueue = async (username) => {
  const userQueue = await Queue.findOne({ username });
  if (!userQueue || userQueue.tasks.length === 0) return;

  for (const task of userQueue.tasks) {
    if (task.status === 'pending') {
      console.log(`Processing task for ${username}:`, task.data);

      try {
        // Simulate task execution
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mark task as completed
        task.status = 'completed';
        console.log(`Task completed for ${username}:`, task.data);
      } catch (error) {
        console.error(`Failed to process task for ${username}:`, task.data);
        task.status = 'failed'; // Mark task as failed if processing fails
      }
    }
  }

  await userQueue.save(); // Save the updated queue
};

module.exports = { processQueue };
