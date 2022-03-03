const express = require("express");
const Validate = require("../schema/validade");
const payment = require("../schema/payment.js");
const paymentController = require("../controller/paymentController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.get("/payment", paymentController.index);

routes.post("/payment", Validate(payment.store), paymentController.store);

routes.put(
  "/payment/:id",
  Validate(payment.update),
  paymentController.update
);

routes.delete(
  "/payment/:id",
  Validate(payment.delete),
  paymentController.destoy
);

module.exports = routes;
