import express from "express";
import { CartItemsController } from "../controllers/cartItems.controllers.js";

const cartItemsRouter = express.Router();
const cartItemsController = new CartItemsController();

cartItemsRouter.post("/",cartItemsController.add);
cartItemsRouter.get("/",cartItemsController.get);
cartItemsRouter.delete("/:id",cartItemsController.delete);

export default cartItemsRouter;
