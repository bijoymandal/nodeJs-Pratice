import fs from "fs";
import express from "express";
import swagger from "swagger-ui-express";
// import apiDocs from './swagger.json' assert { type: 'json' };



import userRouter from "./src/feature/user/user.routes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import productRouter from "./src/feature/product/routes/product.routes.js";
import cartItemsRouter from "./src/feature/cartItems/routes/cartItems.route.js";

const apiDocs = JSON.parse(
  fs.readFileSync(new URL("./swagger.json", import.meta.url), "utf-8")
);

const server = express();
server.use(express.json());
//default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce API");
});
//Middleware to haldle 404 error
server.use((req, res) => {
  res.status(404).json({ message: "Route not found,Please check our documentation for more information at localhost:3200/api-docs" });
});


server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

server.use("/api/product",jwtAuth,productRouter);
server.use("/api/users" ,userRouter);
server.use('/api/cartItems',jwtAuth,cartItemsRouter);


server.listen(3200);
console.log("server is running at 3200");
