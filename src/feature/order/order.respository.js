import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";
import session from "express-session";


export default function orderRepository(){
    
    this.collection="orders";
    
    const placeOrderData = async(userID)=>{
        
        const client = getClient();
        const session = client.startSession();
        try{

            const db = getDB();
            session.startTransaction(); // Mongodb start Transaction
            //start transaction 
            session.startTransaction();
            //1. Get cart Itmems and calculate Amount 
            const items = await this.getTotalAmount(userID);
            const finalTotalAmount = items.reduce((acc,item)=>acc+item.totalAmount,0);
            //2. const create New order
            const NewOrder = new OrderModel(new ObjectId(userId),finalTotalAmount,new Date());
            await db.collection(this.collection).insertOne(NewOrder,{session});
            //3. Reduce the Stock
            for(let item of items)
            {
                await db.collection("products").updateOne(
                    {_id:item.productID},
                    {$inc:{stock:-item.quantity}},{session}
                );   
            } 
            //4. Clear the cart items
            await db.collection("cartItems").deleteMany({
                userId:new ObjectId(userId)
            },{session});
            session.commitTransaction();  //MongoDB save Collection Commit
            session.endSession(); // end transaction
            return;

        }
        catch(error)
        {
            await session.abortTransaction();//transaction no success abort to Rollback
            session.endSession();
            console.log(error);
        }
    }
    const getTotalAmount = async(userId,session)=>{
        try{
            const db = getDB();
            const items = db.collection("cartItems").aggregate([
                {
                    //1. Get cart items for the user
                    $match:{
                        userID:new ObjectId(userId)
                    }
                },
                {
                    //get the products from products collection
                    $lookup:{
                        from:"products",
                        localField:"productID",
                        foreignField:"_id",
                        as:"productInfo"
                    }

                },
                {
                    //Unwind the productInfo
                    $unwind:"$productInfo"
                },
                {
                    // calcculate the totalAmount
                    $addFields:{
                        "totalAmount":{
                            $multiply:["$productInfo.price","$quantity"]
                        }
                    }
                }
            ],{session}).toArray();
            return items;
            // const finalTotalAmount= items.reduce((acc,item)=>acc+item.totalAmount);

            // console.log(items);
        }
        catch(error)
        {
            throw new ApplicationError(error,500);
        }
    }
    return {placeOrderData,getTotalAmount};
}