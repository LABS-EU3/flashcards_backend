const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../resources/auth/router');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/auth', authRouter);
server.get('/', (req, res) => {
  res.status(200).json({ message: `Welcome to the QuickDecks API` });
});

module.exports = server;
