'use strict';

const express = require('express');
const cors = require('cors');
const basicAuth = require('./src/auth/middleware/basic');
const pathValidator = require('./src/auth/middleware/pathValidator.js');
const methodValidator = require('./src/auth/middleware/methodValidator.js');
const errorHandler = require('./src/auth/middleware/errorHandler');
const app = express(); // singleton -> there can only be one
const { handleSignup, handleSignin} = require('./src/auth/router');

app.use(cors());
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true })) ;// form data


// // shout out to Chester for the error handling!
// app.use(methodValidator);
// app.use(pathValidator);

app.post('/signup', basicAuth, handleSignup);
app.post('/signin', basicAuth, handleSignin);

// app.use(errorHandler);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Express now running on port:', port);
    });
  },
};