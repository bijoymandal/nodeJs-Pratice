import ProductModel from "../model/product.model.js";
import {add,getAll,get,filter,rateProducts} from "../../../feature/product/repository/product.repository.js";

// const productRepo = new ProductRepository();

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAll();
    if(!products || products.length===0)
    {
        return res.status(404).json({success:false,message:"Products not found",products:[]});
    }
    return res
      .status(200)
      .json({ success: true, message: "Products fetched successfully", products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await get(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, sizes,image } = req.body;

    let normalizedSizes = [];
    if (typeof sizes === "string") {
      normalizedSizes = sizes.split(",").map(s => s.trim());
    } else if (Array.isArray(sizes)) {
      normalizedSizes = sizes;
    }

    const newProduct = new ProductModel(
      title,
      description,
      parseFloat(price),
      image||"",
      category,
      normalizedSizes
    );
    await add(newProduct);

    return res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.log("error",error);
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, category } = req.query;

    // Example: Assuming your model has a filter method
    const result = await filter(minPrice, maxPrice, category);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const rateProductData = async (req, res) => {
  try {

    const { productID, rating } = req.query;
    console.log("userID, productID, rating",req.user.userID, productID, rating);

    await rateProducts(req.user.userID, productID, rating);

    return res.status(200).json({
      success: true,
      message: "Product rated successfully",
      product: await get(productID),
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
