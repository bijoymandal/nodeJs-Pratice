export default class CartItemsModel {
    constructor(userID,productID, quantity,id) {
        this.userID = userID;
        this.productID = productID;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productID,userID, quantity) {
        /*const existingItem = cartItems.find(
            (item) => item.productID === productID && item.userID === userID
        );
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new CartItemsModel(userID,productID, quantity);
            cartItems.push(newItem);
        }*/
       const cartItem = new CartItemsModel(userID,productID, quantity);
       cartItem.id = cartItems.length + 1; // Simple ID generation
       cartItems.push(cartItem);
       return cartItem;
    }

    static get(userID) {
        return cartItems.filter((item) => item.userID == userID);
    }
}


let cartItems = [
    new CartItemsModel(1,1,2,1),
    new CartItemsModel(2,2,1,2),
    new CartItemsModel(3,3,4,3),
];