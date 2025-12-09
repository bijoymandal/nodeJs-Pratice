import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";

const COLLECTION = "products";


export default function productRepository(){

  this.collection = "products";

  const add = async (newProduct)=>{
    try {
    const db = getDB();
    await db.collection(this.collection).insertOne(newProduct);
    return newProduct;
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  const getAll = async()=>{
    try {
      const db = getDB();
      const products = await db.collection(this.collection).find({}).toArray();
      return products;
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }


  const get = async(id)=>{
    try {
    const db = getDB();
    const product = await db.collection(this.collection).findOne({ _id: new ObjectId(id) });
    return product;
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  const filter = async(minPrice,maxPrice,category)=>{
    try {
        const db = getDB();
        const query = {};
        if (minPrice) {
            query.price = { ...query.price, $gte: parseFloat(minPrice) };
        }
        if (maxPrice) {
            query.price = { ...query.price, $lte: parseFloat(maxPrice) };
        }
        if (category) {
            query.category = category;
        }
        const products = await db.collection(this.collection).find(query).toArray();
        return products;
    }
    catch (error) {
        console.error(error);
        throw new ApplicationError("Something went wrong", 500);
    }
  }

  const rateProducts = async(userID, productID, rating)=>{
    try {
        const db = getDB();
        //1. validate user and product
        const product = await db.collection(this.collection).findOne({ _id: new ObjectId(productID) });
        if (!product) {
            throw new ApplicationError("Product not found", 404);
        }
        //2. check if ratings array exist or not
        if (!product.ratings) {
            product.ratings = [];
        }
        //3. check if user has already rated the product
        const existingRatingIndex = product.ratings.findIndex(r => r.userID === userID);
        if (existingRatingIndex !== -1) {
            // Update existing rating
            product.ratings[existingRatingIndex].rating = rating;
        } else {
            // Add new rating
            product.ratings.push({ userID: new ObjectId(userID), rating: rating });
        }
        //4. update the product in the database
        await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(productID) },
            { $set: { ratings: product.ratings } }
        );
        return product;
    }
    catch (error) {
        console.error(error);
        throw new ApplicationError("Something went wrong", 500);
    }
  }
  const averageProductPricePerCategory = async ()=>{

    try{
      const db = getDB();
      return await db.collection(this.collection)
            .aggregate([
              {
                //stage 1:Get average price Per category
                $group:{
                  _id:"$category",
                  averagePrice:{$avg:"$price"}
                }
              }
            ]).toArray();
    }
    catch(error){
      console.log(error);
      throw new ApplicationError("something went Wrong",500);
    }
  }
  const groupExpensesByTags= async()=>{
    try{
      const db = getDB();
      return await db.collection(this.collection)
        .aggregate([
          {$unwind:"$sizes"},
          {
            $group:{
              _id:"$sizes",
              product:{ //collection name each field 
                $push:{
                  title:"$title"
                }
              }
            }
          }
        ]).toArray();
    }
    catch(error){
      console.log(error);
      throw new ApplicationError("Something went wrong",500);
    }
  }
  return {add,getAll,get,filter,rateProducts,averageProductPricePerCategory,groupExpensesByTags};
}
