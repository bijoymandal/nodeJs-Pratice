import ProductModel from "../model/product.model.js";

export const getAllProducts = (req, res,next) => {
    const products = ProductModel.fetchAllProducts();
    res.status(200).json({success:true,message:"Product fetch successfully",products});
}

export const getOneProduct = (req, res,next) => {
    res.json({message:"get one product",success:true});
}

export const addProduct = (req, res,next) => {
    res.json({message:"add one product",success:true});
}

export const rateProductData = (req, res) => {
    const userID = req.query.userID; 
    const productID= req.query.productID;
    const rating = req.query.rating;
    const error = ProductModel.rateProducts(userID, productID,rating);
    if (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    else{
        return res.status(200).json({ success: true, message: "Product rated successfully",product: ProductModel.getOneProduct(productID) });
    }
}                                                                                                       