const express = require('express');
var cors = require('cors')

const server = express();

server.use(express.json());

server.use(cors())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/verify-token', (req, res) => {
  let body = req.body;
  res.status(200).json(body);
});

module.exports = server;
