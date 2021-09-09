const express = require('express');

const router = express.Router();

const { Format: { success } } = require('../../commons')
const { signUp, login } = require('./services');
const { checkUserExistance } = require('./middlewares');

router.post('/signup', checkUserExistance, signUp, success);
router.post('/login', checkUserExistance, login, success)

module.exports = router;