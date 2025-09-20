import express from "express";
import { UserController } from "../../feature/user/user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup", (req,res)=>{
    userController.signUp(req,res);
});
userRouter.post("/signin", (req,res)=>{
    userController.signIn(req,res);
});
userRouter.get("/profile/:id", userController.getUserProfile);
userRouter.put("/profile/:id", userController.updateUserProfile);

export default userRouter;
