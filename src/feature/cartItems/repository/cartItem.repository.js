import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";

export default function CartItemRepository(){
    
        this.collection = "cartItems";
    
    const add = async (productID,userID,quantity)=>{
        try{
        const db = getDB();
        const collection = db.collection(this.collection);
        return await collection.updateOne(
            {productID:new ObjectId(productID),userID:new ObjectId(userID)},
                {$inc:{quantity:quantity}},
                {upsert:true}
            );
        }
        catch(error)
        {
            throw new ApplicationError("Something went Wrong with database",500);
        }
    }   
    const get = async (userID)=>{
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({userID:new ObjectId(userID)}).toArray();
        }
        catch(error){
            throw new ApplicationError("Something went wrong",400);
        }
    }
    const deleteCart = async(productID,userID)=>
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({userID:new ObjectId(userID),productID:new ObjectId(productID)});
            return result.deletedCount>0;
        }   
        catch(error){
            throw new ApplicationError("Something went wrong",400);
        }
    }

    return {add,get,deleteCart};
}