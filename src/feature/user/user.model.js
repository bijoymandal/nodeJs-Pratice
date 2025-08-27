export class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type; // 'admin' or 'user'
    this.id = id;
  }
  static signUp(name, email, password, type) {
    const newUser = new UserModel(name, email, password, type);
    newUser.id = users.length + 1; // Simple ID generation
    users.push(newUser);
  }
  static signIn(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  }
  static getAll()
  {
    return users;
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
