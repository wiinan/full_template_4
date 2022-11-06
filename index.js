const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const { resolve } = require("path");

const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

module.exports = new (class App {
  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }
  middlewares() {
    this.server.use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );

    this.server.use(cors());

    this.server.use(express.json({ limit: "100mb" }));

    this.server.use(express.text({ limit: "100mb" }));

    this.server.use(express.urlencoded({ limit: "100mb", extended: true }));

    this.server.use(passport.initialize());

    this.server.use(passport.session());

    this.server.use(
      express.static(resolve(__dirname, "public", "img", "products"))
    );
  }
  routes() {
    this.server.use(routes.setup());
  }
})();
