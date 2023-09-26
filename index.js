'use strict';

require('dotenv').config();

const { sequelizeDatabase } = require('./src/auth/models/index');
const { start } = require('./src/server');

const PORT = process.env.PORT || 3002;

// make sure our tables are created, start up the HTTP server.
sequelizeDatabase.sync()
  .then(() => {
    console.log('Connection is working!');
    start(PORT);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });