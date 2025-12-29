import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default function orderRepository(){
    
    this.collection="orders";
    
    const placeOrderData = async(userID)=>{
        
        await this.getTotalAmount(userID);
    }
    const getTotalAmount = async(userId)=>{
        try{
            const db = getDB();
            const items = db.collection("cartItems").aggregate[
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
            ].toArray();
            console.log(items);
        }
        catch(error)
        {
            throw new ApplicationError(error,500);
        }
    }
    return {placeOrderData,getTotalAmount};
}