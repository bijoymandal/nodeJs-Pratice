import CartItemsModel from "../model/cartItems.model.js";

export class CartItemsController {
    add(req, res) {
        const {productID, quantity} = req.query;
        const userID = req.user.userID;
        const updatedCart = CartItemsModel.add(productID,userID, quantity);
        res.status(200).json({success:true,message:"Product added to cart successfully",cartItem:updatedCart});
    }
    get(req, res) {
        const userID = req.user.userID;
        const cartItems = CartItemsModel.get(userID);
        res.status(200).json({success:true,cartItems:cartItems});
    }
    
}