import express from "express";
import {addProduct,getAllProducts,getOneProduct,rateProductData,filterProducts} from "../controller/product.controller.js";

const productRouter = express.Router();

//get routes
productRouter.get("/", getAllProducts);

//post routes
productRouter.post("/add", addProduct);
productRouter.post("/rate", rateProductData);

//product get product
productRouter.get("/:id", getOneProduct);

export default productRouter;