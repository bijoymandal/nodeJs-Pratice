import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

const server = express();
//server view engine setup
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));
//use layouts Middleware in ejs Layouts
server.use(ejsLayouts);
server.set('layout','layouts/main')
//create an instance of productController
const productController = new ProductController();
server.get('/');
//get All Products
server.get('/product',productController.getProducts);
//Add New Product
server.get('/product/new-product',productController.getAddForm);
//store New Product
server.post('/product/add',productController.storeAddFrom);
//middleware
server.use(express.urlencoded({extended:true}));
server.use(express.static('src/views'));

server.listen(3400,()=>{
    console.log('server is running port',3400);
});