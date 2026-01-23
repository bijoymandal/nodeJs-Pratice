import express from "express";
import { UserController } from "../../feature/user/user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup", (req,res)=>{
    userController.signUp(req,res);
});
userRouter.post("/signin", (req,res)=>{
    userController.signIn(req,res);
});
userRouter.get("/profile", jwtAuth,userController.getUserProfile);
userRouter.put("/profile/:id", userController.updateUserProfile);
userRouter.put("/change-password",jwtAuth,userController.resetPassword);

export default userRouter;
