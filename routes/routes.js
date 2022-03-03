const express = require("express");
const users = require("./userRoute");
const products = require("./productRoute");
const userinfo = require("./userInforRoute");
const payment = require("./paymentRoute");
const cart = require("./cartRoute");
const order = require("./orderRoute");
const spec = require("./specRoute");
const validator = require("./validatorRoute");
const images = require("./imageRoutes");
// const googleAuth = require("./googleAuthRoute");

const routes = express.Router();

routes.use("/api", users);
routes.use("/api", products);
routes.use("/api", userinfo);
routes.use("/api", payment);
routes.use("/api", cart);
routes.use("/api", order);
routes.use("/api", spec);
routes.use("/api", validator);
routes.use("/api", images);
// routes.use("/api", googleAuth);

module.exports = routes;
