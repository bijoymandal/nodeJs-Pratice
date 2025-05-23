const http = require('http');
const server = http.createServer((req,res)=>{
    res.write("This is comming from Node JS");
    console.log(req.url);
    if(req.url =='/first')
    {
        //res.writeHead(200,{'Content-Type':'text/html'});
        return res.end('<h1>Welcome to the second page</h1>');
    }
    res.end('Hello from Node JS');
});

server.listen(3200,(req,res)=>{
    console.log('Server is running on port 3200');
});