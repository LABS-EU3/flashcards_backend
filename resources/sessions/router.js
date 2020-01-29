const express = require('express');

const sessionRouter = express.Router();

sessionRouter.get('/', (req, res) => {
  res.json({ message: 'Please' });
});

module.exports = sessionRouter;
