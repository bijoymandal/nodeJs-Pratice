import mongoose from "mongoose";
import dotenv from "dotenv";
//load environment variables from .env file
dotenv.config();
const url = process.env.DB_URL;

export const connectUsingMongoose = ()=>{
    try{
        mongoose.connect(url).then(()=>{
            console.log("Mongo using mongoose is connect");
        }).catch((err)=>{
            console.log(err);
        });  
        
    }
    catch(error)
    {
        console.log(error);
    }
}