const express = require('express');
//create server
const server = express();
//handel default request
server.get('/',(req, res,next) => {
    console.log('this is first middleware');                                                                                                                                                                                                                                                                                                                                                                                                                                                
    next(); // middleware use in simple way 
});

server.get('/',(req, res) => {
    res.send('Welcome to express Server in running mode');                                                                                                                                                                                                                                                                                                                                                                                                                                                
});

//Listen on specified port
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});