import express from "express";
import orderController from "./order.controller.js";

const orderRouter = express.Router();
const OrderController = new orderController();

orderRouter.post("/",OrderController.placeOrder);

export default orderRouter;