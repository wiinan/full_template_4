const express = require("express");
const Validate = require("../schema/validade");
const product = require("../schema/product");
const productController = require("../controller/productController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.get("/product", productController.index);

routes.get("/my-announcement", productController.myIndex);

routes.use(verifyToken);

routes.post("/product", Validate(product.store), productController.store);

routes.put("/product/:id", Validate(product.update), productController.update);

routes.delete(
  "/product/:id",
  Validate(product.delete),
  productController.destoy
);

module.exports = routes;
