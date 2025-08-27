export default class CartItemsModel {
    constructor(userID,productID, quantity,id) {
        this.userID = Number(userID);
        this.productID = Number(productID);
        this.quantity = Number(quantity);
        this.id = id?? cartItems.length + 1;
    }

    static add(productID,userID, quantity) {

        const existingItem = cartItems.find(
            (item) => item.productID == Number(productID) && item.userID == Number(userID)
        );
        if (existingItem) {
            existingItem.quantity += Number(quantity);
            return existingItem;
        } else {
            const newItem = new CartItemsModel(userID,productID, quantity);
            cartItems.push(newItem);
            return newItem;

        }
    //    const cartItem = new CartItemsModel(userID,productID, quantity);
    //    cartItem.id = cartItems.length + 1; // Simple ID generation
    //    cartItems.push(cartItem);
    //    return cartItem;
    }

    static get(userID) {
        return cartItems.filter((item) => item.userID == Number(userID));
    }
}


let cartItems = [
    new CartItemsModel(1,1,2,1),
    new CartItemsModel(2,2,1,2),
    new CartItemsModel(1,2,4,3),
];