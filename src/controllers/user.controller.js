import UserModel from "../models/user.model.js";

export default class UserController {

  async handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    console.log("Sign Up Data:", req.body);
    // Simple validation  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = UserModel.getUser().find((user) => user._email === email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Create new user
    const newUser = UserModel.createUser(name,email,password);
    console.log("Registered Users:",newUser);
    return res.status(201).json({ message: "User registered successfully" });
  }

  async handleUserSignIn(req, res) {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // Check if user exists
    const user = UserModel.findEmail(email,password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.user = {
      id: user._id,
      name: user._name,
      email: user._email,
      photo: user._photo || "default.png" // fallback if not set
    };
    res.locals.user = req.session.user;
    console.log('name:',res.locals.user.name);
    res.redirect('/dashboard');
  }

  userList(req, res) {
    let users = UserModel.getUser();
    res.render("pages/user/userList", {
      title: "Users list",
      activePage: "user",
      users:users
    });
  }

  getAddForm(req, res) {
    res.render("pages/user/register", {
      layout: "layouts/main",
      title: "Create User",
      subTitle: "Add New User",
      activePage: "user",
      errorMessage: null,
    });
  }

  getProfile(req,res){

  }


}
