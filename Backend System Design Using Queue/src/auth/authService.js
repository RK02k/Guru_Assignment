const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  await user.save();
  return { message: 'User registered successfully' };
};

exports.authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
  // const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });

  return token;
};
