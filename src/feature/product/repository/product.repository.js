import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";

const COLLECTION = "products";

export async function add(newProduct) {
  try {
    const db = getDB();
    await db.collection(COLLECTION).insertOne(newProduct);
    return newProduct;
  } catch (error) {
    console.error(error);
    throw new ApplicationError("Something went wrong", 500);
  }
}

export async function getAll() {
  try {
    const db = getDB();
    const products = await db.collection(COLLECTION).find({}).toArray();
    return products;
  } catch (error) {
    console.error(error);
    throw new ApplicationError("Something went wrong", 500);
  }
}

export async function get(id) {
  try {
    const db = getDB();
    const product = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
    return product;
  } catch (error) {
    console.error(error);
    throw new ApplicationError("Something went wrong", 500);
  }
}

export async function filter(minPrice, maxPrice, category) {
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
        const products = await db.collection(COLLECTION).find(query).toArray();
        return products;
    }
    catch (error) {
        console.error(error);
        throw new ApplicationError("Something went wrong", 500);
    }
}

export async function rateProducts(userID, productID, rating) {
    try {
        const db = getDB();
        //1. validate user and product
        const product = await db.collection(COLLECTION).findOne({ _id: new ObjectId(productID) });
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
