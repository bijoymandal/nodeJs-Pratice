const http = require("http");

// const localhost = "http://localhost";
const port =3000;
const server = http.createServer((req, res) => {
  const resMessage = "I am a Ninja";
  res.end(resMessage);
});

server.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

module.exports = server;
