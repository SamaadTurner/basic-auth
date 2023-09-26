'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const { sequelizeDatabase } = require('../src/auth/models');
const base64 = require('base-64');

const request = supertest(app);

beforeAll( async () => {
  await sequelizeDatabase.sync();
});
  
afterAll( async () => {
  await sequelizeDatabase.drop();
});

describe('Auth routes', (() => {
  test('allow for user sign up', async () => {
    let response = await request.post('/signup').send({
      username: 'samaad',
      password: 'test',
    });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('samaad');
  });
  test('Should be able to login in an existing user', async () => {
    let encodedCredentials = base64.encode('samaad:test');

    let response = await request.post('/signin').set({
      Authorization: `Basic ${encodedCredentials}`,
    });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('samaad');
  });
  

}));