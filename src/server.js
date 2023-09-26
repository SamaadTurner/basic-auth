'use strict';

// 3rd Party Resources
const express = require('express');

// Prepare the express app
const app = express();

// routes
const notFound = require('./middleware/404');
const errorMessage = require('./middleware/500');
const userRouter = require('./auth/router');

// Middlewares
app.use(express.json());

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// CRUD
app.use(userRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Server is alive!!!');
});

// error handling
app.use('*', notFound);
app.use(errorMessage);

const start = (port) => app.listen(port, () => console.log('listening on port:', port));

module.exports = { app, start };