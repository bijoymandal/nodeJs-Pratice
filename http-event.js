const http = require('http');
const server = http.createServer((req, res) => {
   if(req.method=="POST")
   {
    console.log(req.body);
     //data from client
     let body = '';
     req.on('data', (chunk) => {
        body += chunk.toString();
     });
     req.on("end",()=>{
        console.log(body);
        res.end("Data received");
     });
   }
   else
   {
      res.end(`Request HTTP server error ${req.method}`);
   }
   // console.log('function end here');
   // res.end('Welcome to Node.js HTTP server');
});
server.listen(3100); 
console.log('Server is listening on port 3100');