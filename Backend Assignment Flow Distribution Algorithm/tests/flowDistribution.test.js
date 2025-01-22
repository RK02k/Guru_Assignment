const distributeUsers = require('../src/algorithms/flowDistribution');
const Astrologer = require('../src/models/Astrologer');
const User = require('../src/models/User');

describe('Flow Distribution Algorithm', () => {
  test('should distribute users evenly among astrologers', () => {
    const astrologers = [
      new Astrologer(1, 'Alice', false),
      new Astrologer(2, 'Bob', true),
      new Astrologer(3, 'Charlie', false)
    ];

    const users = [
      new User(1, 'User1'),
      new User(2, 'User2'),
      new User(3, 'User3'),
      new User(4, 'User4')
    ];

    distributeUsers(users, astrologers);
    expect(astrologers[0].totalConnections).toBeGreaterThan(0);
    expect(astrologers[1].totalConnections).toBeGreaterThan(0);
  });
});