import "./env.js";
import fs from "fs";
import express from "express";
import swagger from "swagger-ui-express";
import cros from "cors";
import {connectToMongoDB} from './src/config/mongodb.js';


// console.log(process.env.DB_URL);
// console.log(process.env.JWT_SECRET);


// import apiDocs from './swagger.json' assert { type: 'json' };
import userRouter from "./src/feature/user/user.routes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import productRouter from "./src/feature/product/routes/product.routes.js";
import cartItemsRouter from "./src/feature/cartItems/routes/cartItems.route.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";

const apiDocs = JSON.parse(
  fs.readFileSync(new URL("./swagger.json", import.meta.url), "utf-8")
);
const server = express();

//middleware to parse json request body
server.use(express.json());

// CROS Policy Configuration
var corsOptions = {
  origin: "*", // allow all origins, or specify ["http://localhost:3000"]
  // methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"],
}
server.use(cros(corsOptions));

//error handler middleware
server.use((error,req,res,next)=>{
  console.log(err);

  if(err instanceof ApplicationError){
    res.status(err.code).send(err.message);
  }
  //server error 

  res.status(503).send('Something went wrong,please try later');
});

/*server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  //return ok for proflight request
  if(req.method =="OPTIONS"){
    return res.status(200).json({});
  }
  next();
}); 
*/

//default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce API");
});
//Middleware to haldle 404 error
// server.use((req, res,next) => {
//   res.status(404).json({ message: "Route not found,Please check our documentation for more information at localhost:3200/api-docs" });
// });




server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);


server.use("/api/product",jwtAuth,productRouter);
server.use("/api/users" ,userRouter);
server.use('/api/cartItems',jwtAuth,cartItemsRouter);


server.listen(3200,()=>{
  console.log("server is running at 3200");
  connectToMongoDB();
});


