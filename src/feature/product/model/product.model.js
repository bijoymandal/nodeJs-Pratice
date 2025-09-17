import { ApplicationError } from "../../../error-handler/applicationError.js";
import {UserModel} from "../../user/user.model.js";

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
    static get(id)
    {
        const product = this.products.find((i)=>i.id == id);
        return product;
    }

    static fetchAllProducts(){
        return this.products;
    }

    static getOneProduct(id) {
        return this.products.find(product => product.id == id);
    }

    static filter(minPrice,maxPrice,category)
    {
        const result = this.products.filter((product)=>{
            return ((!minPrice || product.price >=minPrice) && (!maxPrice || product.price <= maxPrice) && (!category || product.category == category));
        });
        return result;
    } 


    static rateProducts(userID, productID,rating) {
        //1. validate user and product
        const user = UserModel.getAll().find(user => user.id == userID); //check user exist or not
        console.log("user",user);
        if (!user) {
            throw new ApplicationError("User not found",404);
        }
        //2. validate product
        const product = ProductModel.getOneProduct(productID);
        // console.log("product",product);
        if (!product) {
            throw new ApplicationError("Product not found",404);
        }
        //3. check if ratings array exist or not
        if(!product.rating<0 || !product.rating>5){
            throw new ApplicationError("Rating should be between 0 and 5",404);
        }
        if(!product.ratings){
            product.ratings = [];
            product.ratings.push({userID:userID, rating:rating});
        }
        else{
            //4. check if user already rated the product
            const existingRating = product.ratings.findIndex(r => r.userID == userID);
            if (existingRating>=0) {
                //update the rating
                existingRating.rating = rating;
                // product.ratings[existingRating].rating = {userID:userID,rating:rating};
            } else {
                //add new rating
                product.ratings.push({userID:userID, rating:rating});
            }
        }
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
