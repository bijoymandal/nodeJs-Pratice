import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
//middleware to parse urlencoded data
server.use(express.urlencoded({extended:true}));
// server.use(express.static('src/views'));


//server view engine setup
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'src', 'views'));
//use layouts Middleware in ejs Layouts
server.use(ejsLayouts);
server.set('layout','layouts/main');
server.use(express.json());
server.use(express.static(path.join(__dirname, 'src', 'views')));

//create an instance of productController
const productController = new ProductController();
server.get('/');
//get All Products
server.get('/product',productController.getProducts);
//Add New Product
server.get('/product/new-product',productController.getAddForm);
//store New Product
server.post('/product/add',productController.storeAddFrom);



server.listen(3400,()=>{
    console.log('server is running port',3400);
});