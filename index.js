// Please don't change the pre-written code
// Import the necessary modules here

// Write your code here
const http = require('http');
const fs = require('fs');
// Write your code here
const port = 8080;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const data = fs.readFileSync('index.html').toString();
    res.end(data);
});

server.listen(port);
module.exports = server;
