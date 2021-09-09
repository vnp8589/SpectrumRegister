const express = require('express');

const router = express.Router();

const { Format: { success } } = require('../../commons');
const { checkUserExistance } = require('../dashboard/middlewares');
const { registerUser } = require('./services')

router.post('/register', checkUserExistance, registerUser, success);

module.exports = router;