const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const apiRouter = require('./index.js'); // Update the path

// Mock the database connection and any other dependencies
jest.mock('./config', () => ({
  query: jest.fn(),
}));

// Mock the JWT module
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked-token'),
}));

const app = express();

let server;



app.use(express.json());
  app.use(apiRouter); 

describe('POST /login', () => {
//   test('should log in a user with valid credentials', async () => {
   
//     const mockQueryResult = [{ username: 'testuser' }];
//     require('./config').query.mockImplementation((sql, params, callback) => {
//       callback(null, mockQueryResult);
//     });

//     jwt.sign.mockReturnValue('mocked-token');

//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'zaeem@email.com', password: 'abc12S' })
//       .expect(200);

//     expect(response.body).toHaveProperty('auth', 'mocked-token');
//     expect(jwt.sign).toHaveBeenCalledWith(
//       { user: { username: 'testuser' } },
//       'buy-pakistan',
//       { expiresIn: '2h' }
//     );
//   });


test('should log in a user with valid credentials', async () => {
    // Replace with real data from your database
    const realUserData = { email: 'zaeem@email.com', password: 'abc123' };
  
    // Mock the database query
    require('./config').query.mockImplementation((sql, params, callback) => {
      // Validate the password in your actual implementation
      if (params[0] === realUserData.email && params[1] === realUserData.password) {
        callback(null, [realUserData]);
      } else {
        callback(null, []); // User not found or password doesn't match
      }
    });
  
    jwt.sign.mockReturnValue('mocked-token');
  
    // Make a request with real (valid) credentials
    const response = await request(app)
      .post('/login')
      .send({ email: realUserData.email, password: 'actual-password' }) // Use the actual password
      .expect(200);
  
    // Ensure that the response contains the expected token
    expect(response.body).toHaveProperty('auth', 'mocked-token');
    
    // Ensure that jwt.sign was called with the expected parameters
    expect(jwt.sign).toHaveBeenCalledWith(
      { user: { username: realUserData.username } },
      'buy-pakistan',
      { expiresIn: '2h' }
    );
  });
  

  test('should return 404 for an invalid user', async () => {
    require('./config').query.mockImplementation((sql, params, callback) => {
      callback(null, []); 
    });

    await request(app)
      .post('/login')
      .send({ email: 'nonexistent@example.com', password: 'invalidpassword' })
      .expect(404);
  });

  test('should return 400 for missing credentials', async () => {
    await request(app)
      .post('/login')
      .send({})
      .expect(400);
  });

  test('should return 500 for a database error', async () => {
    require('./config').query.mockImplementation((sql, params, callback) => {
      callback(new Error('Database error'));
    });

    await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(500);
  });
  
});

