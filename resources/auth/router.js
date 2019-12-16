const express = require('express');
const { signup } = require('./controller');

const router = express.Router();

router.post('/register', signup);

module.exports = router;
