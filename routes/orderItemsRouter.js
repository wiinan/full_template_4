const express = require("express");
const Validate = require("../schema/validade");
const orderItems = require("../schema/orderItems");
const orderItemController = require("../controller/orderItemController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.get("/orderitems", orderItemController.index);

// routes.get("/orderItems", orderItemsController.index);

routes.post(
  "/orderitems/:id",
  Validate(orderItems.store),
  orderItemController.store
);

routes.put(
  "/orderitems/:id",
  Validate(orderItems.update),
  orderItemController.update
);

routes.delete(
  "/orderitems/:id",
  Validate(orderItems.delete),
  orderItemController.destoy
);

module.exports = routes;
