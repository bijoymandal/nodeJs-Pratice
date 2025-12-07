
import CartItemsModel from "../model/cartItems.model.js";
import CartItemRepository from "../repository/cartItem.repository.js";


export default function CartItemsController() {
    this.cartItemRepository = new CartItemRepository();
    const add = async (req, res)=> {
        try{
        const {productID, quantity} = req.body;
        const userID = req.user.userID;
        const updatedCart = await this.cartItemRepository.add(productID,userID, quantity);
        // console.log(updatedCart);
        res.status(200).json({success:true,message:"Product added to cart successfully",cartItem:updatedCart});
        }
        catch(error)
        {
            res.status(500).json({success:false,message:error});
        }
    }
    const get = async(req, res) =>{
        
        const userID = req.user.userID;
        try{
        const cartItems = await this.cartItemRepository.get(userID);
        res.status(200).json({success:true,cartItems:cartItems});
        }
        catch(error)
        {
            res.status(500).json({message:false,message:error});
        }
    }
    const remove = async (req, res) =>{
        const userID = req.user.userID;
        const {id} = req.params;
        const deletedItem = this.cartItemRepository.deleteCart(userID,id);
        if (deletedItem) {
            res.status(200).json({success:true,message:"Cart item deleted successfully",deletedItem:deletedItem});
        } else {
            res.status(404).json({success:false,message:"Cart item not found"});
        }
    }
    return {add,get,remove};
}