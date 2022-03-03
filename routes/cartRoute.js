const express = require("express");
const Validate = require("../schema/validade");
const cart = require("../schema/cart");
const cartController = require("../controller/cartController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.get("/cart", cartController.index);

routes.post("/cart/:id", Validate(cart.store), cartController.store);

routes.put("/cart/:id", Validate(cart.update), cartController.update);

routes.delete(
  "/cart/:id",
  Validate(cart.updateRemoveProduct),
  cartController.RemoveProduct
);

module.exports = routes;
