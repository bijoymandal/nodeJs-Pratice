
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,match.[/\,"Please enter the valid email"]},
    password:{
        type"String,
        validate:{
            validator:function(value}
            {
                return /..\.test(value)            
            },
            message:"password should be 8-12 characters and have a special characters"
    }
},
    type:{type:String,enum:['Customer','Seller']},
});
