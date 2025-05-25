const express = require('express');
//create server
const server = express();
//handel default request
server.get('/',(req, res) => {
    res.send('Welcome to express Server');                                                                                                                                                                                                                                                                                                                                                                                                                                                
});

//Listen on specified port
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});