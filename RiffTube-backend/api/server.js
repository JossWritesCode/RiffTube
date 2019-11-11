const multer  = require('multer');  
const express = require('express');
const cors = require('cors')

const server = express();
const upload  = multer({ storage: multer.memoryStorage() });

server.use(express.json());

server.use(cors())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/verify-token', upload.single('blob'), (req, res) => {  
  const body = req.body;
  
  console.log( 'verify token' );
  console.log( req.file );
  
  res.status(200).json({'status': 'ok'});
});

module.exports = server;
