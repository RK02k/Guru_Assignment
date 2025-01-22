const Queue = require('bull');

const userQueues = {}; // Store queues for each user

exports.createQueue = (username) => {
  if (!userQueues[username]) {
    userQueues[username] = new Queue(username, 'redis://127.0.0.1:6379');
  }
  return userQueues[username];
};

exports.addToQueue = async (username, data) => {
  const queue = this.createQueue(username);
  await queue.add(data);
};

exports.getQueue = (username) => userQueues[username];
