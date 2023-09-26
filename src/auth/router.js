'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { userModel } = require('./models/index');
const basicAuth = require('./middleware/basic');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});
  

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) { next('Invalid Login. Message: ', error.message);
  }
});

module.exports = router;