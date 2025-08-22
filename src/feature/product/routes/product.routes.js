import express from "express";
import {addProduct,getAllProducts,getOneProduct,rateProduct} from "../controller/product.controller.js";

const productRouter = express.Router();

//get routes
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getOneProduct);
//post routes
productRouter.post("/add", addProduct);
productRouter.post("/rate/:id", rateProduct);

export default productRouter;