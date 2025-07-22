export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this._id = _id;
    this._name = _name;
    this._email = _email;
    this._password = _password;
  }
  static getUser() {
    return users;
  }
}
