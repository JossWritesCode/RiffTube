const server = require('./server/index.js');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
