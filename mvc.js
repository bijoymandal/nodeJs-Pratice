import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';

const server = express();
//server view engine setup
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

//create an instance of productController
const productController = new ProductController();
server.get('/',productController.getProducts);

server.use(express.static('src/views'));

server.listen(3400)