export default class ProductModal{
    constructor(_id,_name,_price,_desc,_imageUrl,_status){
        this._id = _id;
        this._name = _name;
        this._price = _price;
        this._desc = _desc;
        this._imageUrl = _imageUrl;
        this.status = _status;
    }
    static getProduct(){
        return products;
    }
    static add(productObj)
    {
        let newProduct = new ProductModal(products.length+1,productObj.name,productObj.desc,productObj.price,productObj.imageUrl);
        products.push(newProduct);
    }
}

var products = [

    new ProductModal("1","Product 1",100,"Description for product 1","https://picsum.photos/200/300",'active'),
    new ProductModal("2","Product 2",200,"Description for product 2","https://picsum.photos/200/300","InActive"),
    new ProductModal("3","Product 3",300,"Description for product 3","https://picsum.photos/200/300","active"),
    new ProductModal("4","Product 4",400,"Description for product 4","https://picsum.photos/200/300","active"),
];