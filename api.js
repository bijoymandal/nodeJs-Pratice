import express from "express";
import userRouter from "./src/feature/user/user.routes.js";
import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";

const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce API");
});

server.use("/api/users",basicAuthorizer ,userRouter);

server.listen(3200);
console.log("server is running at 3200");
