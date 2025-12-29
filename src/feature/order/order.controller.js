import orderRepository from "./order.respository.js";


export default function orderController(){
    this.OrderRepository = new orderRepository();
    const placeOrder = async(req,res)=>{
        try{
            
            const userId = req.user.userID;
            const result = await this.OrderRepository.placeOrderData(userId);
            console.log(result);
            res.status(200).json(result);
        }
        catch(error){
            return res.status(500).json(error);
        }
    }
    return {placeOrder};
}