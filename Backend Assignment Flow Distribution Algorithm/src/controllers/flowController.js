const distributeUsers = require('../algorithms/flowDistribution');
const Astrologer = require('../models/Astrologer');
const User = require('../models/User');

let astrologers = [];

exports.initializeAstrologers = (req, res) => {
  astrologers = req.body.map(({ id, name, isTopAstrologer }) => new Astrologer(id, name, isTopAstrologer));
  res.status(200).json({ message: 'Astrologers initialized', astrologers });
};

exports.distributeFlow = (req, res) => {
  const users = req.body.map(({ id, name }) => new User(id, name));
  distributeUsers(users, astrologers);
  res.status(200).json({ message: 'Flow distributed' });
};