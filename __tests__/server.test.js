'use strict';

const { app } = require('../server');
const supertest = require('supertest');
const mockRequest = supertest(app);
const { sequelizeDatabase } = require('../src/auth/models');
//const handle500Error = require('../src/auth/middleware/500');

beforeAll( async () => {
  await sequelizeDatabase.sync();
});

afterAll( async () => {
  await sequelizeDatabase.drop();
});

describe('Server', () => {
  
  test('404 on bad route', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toEqual(404);
  });
  
  test('404 on bad method', async () => {
    const response = await mockRequest.post('/');
    expect(response.status).toEqual(404);
  });
  
});
  