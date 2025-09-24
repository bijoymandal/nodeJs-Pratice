import express from "express";
import {getAllProducts,addProduct,rateProductData,filterProducts,getOneProduct} from "../controller/product.controller.js";

const productRouter = express.Router();

//get routes
productRouter.get("/", (req,res)=>{
    ProductController.getAllProducts(req,res);
});

//post routes
productRouter.post("/add", (req,res)=>{
    ProductController.addProduct(req,res)
});
productRouter.post("/rate", (req,res)=>{
    ProductController.rateProductData(req,res)
});

// product filter 
productRouter.get('/filter',(req,res)=>{
    ProductController.filterProducts(req,res)
});

//product get product
productRouter.get("/:id",(req,res)=>{
    ProductController.getOneProduct(req,res)
});

export default productRouter;