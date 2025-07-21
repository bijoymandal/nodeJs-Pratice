export default class ProductModal {
  constructor(_id, _name, _price, _desc, _imageUrl, _status) {
    this._id = _id;
    this._name = _name;
    this._price = _price;
    this._desc = _desc;
    this._imageUrl = _imageUrl;
    this.status = _status;
  }
  static getProduct() {
    return products;
  }
  static add(productObj) {
    let newProduct = new ProductModal(
      products.length + 1,
      productObj.name,
      productObj.price,
      productObj.desc,
      productObj.imageUrl
    );
    products.push(newProduct);
  }
  static getById(id) {
    return products.find((product) => product._id === id);
  }
  static update(productObj) {
    let productFound = products.findIndex(
      (product) => product._id === productObj._id
    );
    return (products[productFound] = productObj);
  }
  static delete(title) {
    const index = products.findIndex((product) => product._id === title);
    products.splice(index, 1);
  }
}

var products = [
  new ProductModal(
    "1",
    "Apple",
    100,
    "Description for product 1",
    "https://picsum.photos/200/300",
    "active"
  ),
  new ProductModal(
    "2",
    "Samsung",
    200,
    "Description for product 2",
    "https://picsum.photos/200/300",
    "InActive"
  ),
  new ProductModal(
    "3",
    "Banana",
    300,
    "Description for product 3",
    "https://picsum.photos/200/300",
    "active"
  ),
  new ProductModal(
    "4",
    "Water",
    400,
    "Description for product 4",
    "https://picsum.photos/200/300",
    "active"
  ),
  new ProductModal(
    "5",
    "Bag",
    400,
    "Description for product 4",
    "https://picsum.photos/200/300",
    "active"
  ),
  new ProductModal(
    "6",
    "Sister",
    460,
    "Description for product 4",
    "https://picsum.photos/200/300",
    "active"
  ),
  new ProductModal(
    "7",
    "Router",
    4200,
    "Description for product 4",
    "https://picsum.photos/200/300",
    "active"
  ),
];
