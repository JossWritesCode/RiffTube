const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/verify-token', (req, res) => {
  let user = req.body;
});

module.exports = server;
