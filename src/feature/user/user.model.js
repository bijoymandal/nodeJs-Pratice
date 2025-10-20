import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type; // 'admin' or 'user'
    this.id = id;
  }
  // static async signUp(name, email, password, type) {
  //   try{
  //     //1. Get the database
  //     const db = getDB();
  //     //2. Get the collection
  //     const collection = db.collection("users")

  //     const newUser = new UserModel(name, email, password, type);
  //     //3. Insert the document
  //     await collection.insertOne(newUser);
  //     return newUser;
  //   }
  //   catch(error)
  //   {
  //     throw new ApplicationError("Something went Wrong",500);
  //   }
    
  // }
  // static async signIn(email, password) {
  //   try{
  //     const db = getDB();
  //     const collection = db.collection("users");
  //     const user = await collection.findOne({email:email,password:password});
  //     if(!user){
  //       throw new ApplicationError("Invalid email or password",401);
  //     }
  //     return user;
  //   }
  //   catch(error)
  //   {
  //     throw new ApplicationError("Something went Wrong",500);
  //   }
  // }
  static getAll()
  {
    return users;
  }
  static findByEmail(email)
  {
    const user = users.find(u=>u.email===email);
    return user || null;
  }
  static async getById(id)
  {

    const user = users.find(u=>u.id === id);
    return user || null;
    
  }
}

var users = [
  {
    id:1,
    name: "Seller User",
    email: "seller@ecom.com",
    password: "seller123",
    type: "seller",
  },
  {
    id:2,
    name: "Customer User",
    email: "customer@ecom.com",
    password: "customer123",
    type: "customer",
  },
];
