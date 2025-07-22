import ProductModal from "../models/user.model.js";

export default class UserController {
  userList(req, res) {
    res.render("pages/user/userList", {
      title: "Users list",
      activePage: "user",
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
}
