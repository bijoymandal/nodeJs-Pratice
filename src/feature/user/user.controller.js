import jwt from "jsonwebtoken";
import { UserModel } from "../../feature/user/user.model.js";
import UserRepository from "../../feature/user/user.repository.js";
import bcrypyt from "bcrypt";

export class UserController {
  // user Repository using get logic validation
  constructor() {
    this.userRepository = new UserRepository(); 

  }
  
  
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    try {
      const hashedPassword = await bcrypyt.hash(password, 12);  
      const user = new UserModel(name, email, hashedPassword, type);
      
      await this.userRepository.signUp(user);
      res
        .status(201)
        .json({ message: "User registered successfully",data: user });
    } catch (error) {
      res.status(400).json({ error: error.message,"message": "User registration failed" });
    }
  }


  async signIn(req, res) {
    const {email,password} = req.body;
    
    const userEmail = await UserModel.findByEmail(email);
    
    if(!userEmail){
      return res.status(400).json({ message: "Invalid email or password" });
    } 
    else{
      // const isPasswordValid = await bcrypyt.compare(password, userEmail.password);
      const isPasswordValid = await (userEmail.password === password);
      if(isPasswordValid){
        //1. create token 
        const token = jwt.sign({userID:userEmail.id.toString(),email:userEmail.email},process.env.JWT_SECRET,{expiresIn:"1h"});
        //2. send token to client
        return res.status(200).send(token);
        //access token  likesco
        // res.cookie("jwtToken",token,{httpOnly:true});
      }
      else
      {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }
  }
  getUserProfile(req, res) {
    console.log(req);
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
