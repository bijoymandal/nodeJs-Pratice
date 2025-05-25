const express = require('express');
//create server
const server = express();
//handel default request

// using function middleware

function firstMiddleware(req, res, next) {
    console.log('this is first middleware');
    next(); // call next middleware
}
function secondMiddleware(req, res, next) {
    console.log('this is second middleware');
    next(); // call next middleware
}

function globalMiddleware(req, res, next) {
    console.log('this is global middleware');
    next(); // call next middleware
}
server.use(globalMiddleware); // apply global middleware

server.get('/send',[firstMiddleware,secondMiddleware],(req, res) => {
    res.send('Welcome to express Server in running mode');                                                                                                                                                                                                                                                                                                                                                                                                                                                
});

//Listen on specified port
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});