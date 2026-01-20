import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel = mongoose.model('User',userSchema);
class UserRepository {


      // constructor(){
      //   this.collection = "users";
      // }

    async signUp(newUser){
        try{
            // const db = getDB();
            // const collection = db.collection(this.collection);

            // await collection.insertOne(newUser);
            
            const newUser = new userModel(newUser);
            await newUser.save(); 
            return newUser;
        }
        catch(error)
        {
            console.log(error);
            throw new ApplicationError("Something went Wrong",500);
        }
    }
    // async signIn(email, password) {
    //     try{
    //       const db = getDB();
    //       const collection = db.collection(this.collection);
    //       const user = await collection.findOne({email:email});
    //       if(!user){
    //         throw new ApplicationError("Invalid email or password",401);
    //       }
    //       return user;
    //     }
    //     catch(error)
    //     {
    //       throw new ApplicationError("Something went Wrong",500);
    //     }
    // }
    async findByEmail(email) {
      try {
        // const db = getDB();
        // const collection = db.collection("users");
        // const user = await collection.findOne({ email: email });
        return await userModel.findOne({email,password});
      }
      catch (error) {
        throw new ApplicationError("Something went Wrong", 500);
      }
    }
}

export default UserRepository;