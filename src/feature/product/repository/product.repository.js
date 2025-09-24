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
