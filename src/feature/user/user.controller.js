import UserModel from "./user.model.js";

export class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    try {
      const user = UserModel.SignUp(name, email, password, type);
      res
        .status(201)
        .json({ message: "User registered successfully" })
        .send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = UserModel.SignIn(email, password);
      res.status(200).json({ message: "User signed in successfully", user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
  getUserProfile(req, res) {
    const userId = req.params.id; // Assuming user ID is passed as a URL parameter
    const user = UserModel.getById(userId); // Implement getById method in UserModel
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
  updateUserProfile(req, res) {
    const userId = req.params.id; // Assuming user ID is passed as a URL parameter
    const { name, email, password } = req.body;
    try {
      UserModel.update(userId, { name, email, password }); // Implement update method in UserModel
      res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
