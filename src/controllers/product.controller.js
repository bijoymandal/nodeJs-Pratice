import path from 'path';
import ProductModal from '../models/product.modal.js';



export default class ProductController {
    getProducts(req, res) {
        let products = ProductModal.getProduct();
        // return res .sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
        res.render("pages/products",{title:'Product list',product:products})
    }
    searchProducts(req, res) {
        const query = req.body.name?.trim().toLowerCase() || '';
        const products = ProductModal.getProduct();
        const filteredProducts = query
            ? products.filter(product => 
                product._name.toLowerCase().includes(query)||
                product._price.toString().includes(query)
            )
            : products;
        res.render('partials/productRow', { product: filteredProducts, layout: false });

  
    }



    getAddForm(req,res)
    {
        return res.render("pages/new-product",
            {
                layout:'layouts/main',
                title:'Create Product',
                subTitle:'Add New Product',
                errorMessage: null,
            });
    }
    storeAddFrom(req,res){
        console.log(req.body);
        //validate data
        
        ProductModal.add(req.body);
        // all Products get
        let products =  ProductModal.getProduct();
        return res.render("pages/products",{products}); 
        //res.redirect('/product');
    }
    getUpdateProductView(req, res,next) {
        //1. if product exists then return view
        const id = req.params.title;
        const productFound = ProductModal.getById(id);
        if(productFound){
            return res.render("pages/update-product",
                {
                    layout:'layouts/main',
                    title:'Update Product',
                    subTitle:'Update Product',
                    errorMessage: null,
                    productData: productFound
                });
        }
        else{
            res.status(401).send("Product not found");
            next(); 
        }//if not found then go to next middleware           
        //2.else return errors
    }
    updateProduct(req,res){
        ProductModal.update(req.body);
        var products = ProductModal.getProduct();
        return res.render("pages/products",{products});
    }
    deleteProduct(req, res) {
  const id = req.params.id;
  const productFound = ProductModal.getById(id);

  if (!productFound) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  ProductModal.delete(id);

  return res.json({ success: true });
}

}