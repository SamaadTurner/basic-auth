const basicAuth = require('../src/auth/middleware/basic.js');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { sequelizeDatabase, userModel } = require('../src/auth/models/index.js');

beforeAll(async () => {
  await sequelizeDatabase.sync();
  await userModel.create({
    username: 'samaad',
    password: await bcrypt.hash('test', 10),
  });
});

describe('Tests for basic auth middleware', () => {
  test('Should parse basic auth header', async () => {
    let encodedCredentials = base64.encode('samaad:test');
    const authHeader = {
      authorization: `Basic ${encodedCredentials}`,
    };
    const req = {
      path: '/signin',
      headers: authHeader,
    };
    const res = null;
    const next = jest.fn(); // spy function that jest can track

    basicAuth(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
