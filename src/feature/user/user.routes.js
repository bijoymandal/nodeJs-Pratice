import express from "express";
import { UserController } from "./user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.get("/profile/:id", userController.getUserProfile);
userRouter.put("/profile/:id", userController.updateUserProfile);
