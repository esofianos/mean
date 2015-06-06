var http = require('http');
var server = http.createServer();
server.on('request', function(req, res) {
  res.end('Hello World!\n');
});
server.listen(3000);
console.log('My awesome web server is running on port 3000');
