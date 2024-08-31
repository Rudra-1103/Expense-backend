import request from 'superagent';
import { expect } from 'chai';
import { app } from '../app.js'; // Update path to your app

describe('User Endpoints', () => {
  let server;

  before((done) => {
    // Start the server before running tests
    server = app.listen(3000, done);
  });

  after((done) => {
    // Close the server after tests are done
    server.close(done);
  });

  it('should register a new user', async () => {
    const response = await request.post('http://localhost:3000/api/v1/users/register')
      .send({
        name: 'testuser',
        email: 'testemail@example.com',
        password: 'testpassword'
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message', 'User created successfully');
  });
});
