import ProductModel from "../model/product.model.js";

export const getAllProducts = (req, res,next) => {
    const products = ProductModel.fetchAllProducts();
    res.status(200).json({success:true,message:"Product fetch successfully",products});
}

export const getOneProduct = (req, res) => {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if(!product)
    {
        return res.status(404).json({message:"product Not found"});
    }
    else
    {
        return res.status(200).json({message:"product get successfully",data:product});
    }
    
}

export const addProduct = (req, res,next) => {
    res.json({message:"add one product",success:true});
}

export const rateProductData = (req, res) => {
    const userID = req.query.userID; 
    const productID= req.query.productID;
    const rating = req.query.rating;
    try{
        ProductModel.rateProducts(userID, productID,rating);
    }
    catch(error){
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(200).json({ success: true, message: "Product rated successfully",product: ProductModel.getOneProduct(productID) });
}                                                                                                       