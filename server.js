const http = require('http');

const server = http.createServer((req, res) => {
  res.end('hello')
});

server.listen(3000, () => { console.log('up on 3000');})