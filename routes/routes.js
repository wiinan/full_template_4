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
const googleAuth = require("./googleAuthRoute");

class IndexRoutes {
    constructor () {
        this.routes = express.Router();

        this.users = new users()
    }

    setup () {
        this.routes.use("/api", this.users.setup());
        this.routes.use("/api", products);
        this.routes.use("/api", userinfo);
        this.routes.use("/api", payment);
        this.routes.use("/api", cart);
        this.routes.use("/api", order);
        this.routes.use("/api", spec);
        this.routes.use("/api", validator);
        this.routes.use("/api", images);

        return this.routes;
    }
}


module.exports = new IndexRoutes();
