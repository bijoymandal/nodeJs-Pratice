import express from "express";
// import {getAllProducts,addProduct,rateProductData,filterProducts,getOneProduct} from "../controller/product.controller.js";

import productController from "../controller/product.controller.js";

const productRouter = express.Router();
const ProductController = new productController();

//get routes
productRouter.get("/",ProductController.getAllProducts);

//post routes
productRouter.post("/add", ProductController.addProduct);
productRouter.post("/rate", ProductController.rateProductData);

// product filter 
productRouter.get('/filter',ProductController.filterProducts);

//product averagePrice
productRouter.get("/averagePrice",ProductController.averagePrice);

//product get product
productRouter.get("/:id",ProductController.getOneProduct);



export default productRouter;