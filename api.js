import express from "express";
import userRouter from "./src/feature/user/user.routes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import productRouter from "./src/feature/product/routes/product.routes.js";

const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce API");
});

server.use("/api/product",jwtAuth,productRouter);
server.use("/api/users" ,userRouter);


server.listen(3200);
console.log("server is running at 3200");
