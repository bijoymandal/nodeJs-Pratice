export default class UserModel {
  constructor(id,name, email, password) {
    this._id = Number(id);
    this._name = name;
    this._email = email;
    this._password = password;
  }
  
  // Initialize lastId as the highest existing ID
  static getUser() {
    return users;
  }
  static createUser(name,email,password){ 
    const lastId = users.length > 0 ? Math.max(...users.map(u => u._id)) : 0;
    const newUser = new UserModel(lastId+1,name,email,password);
    users.push(newUser);
    return newUser;
  }

  static findEmail(email,password){
    return users.find((user) => user._email == email && user._password == password);
  }
}

let users = [
  new UserModel(1, "John Doe", "johndoe@example.com","password123"),
  new UserModel(2, "Bijoy", "bijoy@example.com","password")
];