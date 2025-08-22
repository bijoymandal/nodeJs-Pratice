import { fetchAllProducts } from "../model/product.model.js";

export const getAllProducts = (req, res,next) => {
    const products = fetchAllProducts();
    res.status(200).json({success:true,products});
}

export const getOneProduct = (req, res,next) => {
    res.json({message:"get one product",success:true});
}

export const addProduct = (req, res,next) => {
    res.json({message:"add one product",success:true});
}

export const rateProduct = (req, res,next) => {
    res.json({message:"rate one product",success:true});
}