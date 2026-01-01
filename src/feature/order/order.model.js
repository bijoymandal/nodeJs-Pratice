
export default function OrderModel(userID,totalAmount,timeStamp){
    return{
        userID :userID,
        totalAmount :totalAmount,
        timeStamp:timeStamp ?? new Date().toISOString(),
    };    
}