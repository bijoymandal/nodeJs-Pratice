let id=1;
export default class ProductModel {
    static products = [];
    constructor(title, description, price,imageUrl,category,sizes=[]) {
        this.id = id++;
        this.title = String(title);
        this.description = String(description);
        this.price = Number(price);
        this.imageUrl = String(imageUrl);
        this.category = String(category);
        this.sizes = Array.isArray(sizes) ? sizes : [];
        
        //add Product to static array
        ProductModel.products.push(this);
        
    }

    static fetchAllProducts(){
        return this.products;
    }

    static getOneProduct(id) {
        return this.products.find(product => product.id === id);
    }

    static rateProduct(userID, productID,rating) {
        
    }

    static addProduct({title, description, price,imageUrl,category,sizes=[]}){
        return new ProductModel(title, description, price,imageUrl,category,sizes)
    }


}

//-------------- Simple Data --------
new ProductModel("T-Shirt", "Comfortable cotton t-shirt", 100, "https://example.com/tshirt.jpg", "Clothing", ["S", "M", "L", "XL"]);
new ProductModel("Jeans", "Stylish blue jeans", 200, "https://example.com/jeans.jpg", "Clothing", ["30", "32", "34", "36"]);
new ProductModel("Sneakers", "Running sneakers", 300, "https://example.com/sneakers.jpg", "Footwear", ["8", "9", "10", "11"]);
new ProductModel("Jacket", "Warm winter jacket", 99.99, "https://example.com/jacket.jpg", "Clothing", ["M", "L", "XL"]);
new ProductModel("Backpack", "Durable backpack for everyday use", 39.99, "https://example.com/backpack.jpg", "Accessories", []);
//-------------- Simple Data --------
