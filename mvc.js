import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import validationMiddleware from "./src/middleware/validation.middleware.js";
import { uploadFile } from "./src/middleware/file-upload.middleware.js";

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Serve static files (like CSS, JS, images)
server.use(express.static(path.join(__dirname, "src", "public"))); // store assets in src/public

// View engine setup
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "src", "views"));

// EJS Layouts
server.use(ejsLayouts);
server.set("layout", "layouts/main");

// Instantiate ProductController
const productController = new ProductController();
const userController = new UserController();

// Routes
/*server.get("/", (req, res) => {
  res.redirect("/product"); // Redirect root to product list
});*/
//products
server.get("/product", productController.getProducts);
server.post("/product/search", productController.searchProducts);
server.get("/product/new-product", productController.getAddForm);
server.post(
  "/product/add",
  validationMiddleware,
  uploadFile.single("imageUrl"), // Use 'imageUrl' as the field name
  productController.storeAddFrom
);
server.get(
  "/product/update-product/:title",
  productController.getUpdateProductView
);
server.get("/product/delete-product/:id", productController.deleteProduct);

//users

server.get("/user", userController.userList);
server.get("/user/register", userController.getAddForm);

// Start server
server.listen(3400, () => {
  console.log("Server is running on http://localhost:3400");
});
