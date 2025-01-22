const express = require('express');
const { registerUser, authenticateUser } = require('../auth/authService');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await registerUser(username, password);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authenticateUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
