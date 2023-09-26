'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/auth/models');

const request = supertest(app);

beforeAll( async () => {
  await sequelizeDatabase.sync();
});
  
afterAll( async () => {
  await sequelizeDatabase.drop();
});

describe('Auth routes', (() => {
  test('allow for user sign up', async () => {
    const response = await request.post('/signup').send({
      username: 'samaad',
      password: 'samaadturner23',
    });

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('samaad');
  });

  test('allow for sign in', async () => {
    const response = await request.post('/signin').set('Authorization', 'Basic SWtlOnBhc3M=');

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('samaad');
  });
}));