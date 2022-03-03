const express = require("express");
const Validate = require("../schema/validade");
const order = require("../schema/order");
const orderController = require("../controller/orderController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.get("/order", orderController.index);

routes.post("/order", Validate(order.update), orderController.store);

routes.put("/order/:id", Validate(order.update), orderController.update);

routes.delete(
  "/order/:id",
  Validate(order.updateRemoveProduct),
  orderController.updateRemoveProduct
);

module.exports = routes;
