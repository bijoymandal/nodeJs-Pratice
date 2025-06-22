import path from 'path';
import ProductModal from '../models/product.modal.js';



export default class ProductController {
    getProducts(req, res) {
        let products = ProductModal.getProduct();
        console.log(products);
        console.log(path.resolve());
        // return res .sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
        res.render("pages/products",{title:'Product list',products:products})
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
        const { name, price, desc,imageUrl } = req.body;
        let errors=[];
        if(!name || name.trim() === ''){
            errors.push("Name is required");
        }
        if(!price || price.trim() === ''){
            errors.push("Price is required");
        }
        if(!desc || desc.trim() === ''){
            errors.push("Description is required");
        }
        if(!imageUrl ===''){
            errors.push("Image URL is required");
        }
        try{
            const validUrl = new URL(imageUrl);

        }
        catch(err){
            console.log(err);
            errors.push("Image URL is not valid");
        }
        if(errors.length > 0){
            return res.render("pages/new-product", {
                layout: 'layouts/main',
                title: 'Create Product',
                subTitle: 'Add New Product',
                errorMessage: errors[0],
                // productData: req.body
            });
        }
        ProductModal.add(req.body);
        // all Products get
        let products =  ProductModal.getProduct();
        return res.render("products",{products}); 
        //res.redirect('/product');
    }
}