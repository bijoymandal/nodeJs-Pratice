import jwt from "jsonwebtoken";
import { UserModel } from "../../feature/user/user.model.js";

export class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    try {
      const user = UserModel.signUp(name, email, password, type);
      res
        .status(201)
        .json({ message: "User registered successfully",data: user })
        .send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  signIn(req, res) {
    const result  = UserModel.signIn(req.body.email, req.body.password); 
    console.log(result);
    if(!result){
      res.status(401).json({ message: "Invalid email or password" });
    }
    else{
        //1. create token 
        const token = jwt.sign({userID:result.id,email:result.email},"ezt2BC7QWScw510rVLFaWXK18Kvb1jL5",{expiresIn:"1h"});
        //2. send token to client
      res.status(200).send(token);
      //access token
      // res.cookie("jwtToken",token,{httpOnly:true});
    }
  }
  getUserProfile(req, res) {
    const userId = req.params.id; // Assuming user ID is passed as a URL parameter
    const user = UserModel.getById(userId); // Implement getById method in UserModel
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
  updateUserProfile(req, res) {
    const userId = req.params.id; // Assuming user ID is passed as a URL parameter
    const { name, email, password } = req.body;
    try {
      UserModel.update(userId, { name, email, password }); // Implement update method in UserModel
      res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
