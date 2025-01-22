const request = require('supertest');
const app = require('../src/app');  // Import from app.js
const expect = require('chai').expect;  // Ensure chai is used if required

describe('Queue Routes', function () {
  this.timeout(5000); // Increase timeout to 5000ms or more

  let token;
  before(async () => {
    // Simulate user registration and login to get token
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    token = res.body.token;
  });

  it('should enqueue a task successfully', async () => {
    const res = await request(app)
      .post('/queue/enqueue')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: 'Test Task Data' });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Request added to queue');
  });
});

