const express = require("express");
const Validate = require("../schema/validade");
const users = require("../schema/users");
const UserController = require("../controller/userController");
const verifyToken = require("../middlewares/verifyToken");

const imgController = require("../controller/imgController");

// const passport = require("passport");
// const googleAuthController = require("../controller/googleAuthController");
// require("../config/googleAuth");

const routes = express.Router();

routes.post("/signup", Validate(users.store), UserController.store);
routes.post("/login", Validate(users.login), UserController.login);

// routes.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// routes.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/api/login" }),
//   googleAuthController.store
// );

// routes.get("/google/users", googleAuthController.index);

// routes.post(
//   "/google/local/:id",
//   googleAuthController.loginGoogle
// );

routes.get("/image", imgController.convertBase64);

routes.use(verifyToken);

// routes.get("/google/user", googleAuthController.getUser);

routes.get("/all", UserController.index);
routes.get("/profile", UserController.actualUser);
routes.put("/update/:id", Validate(users.update), UserController.update);
routes.delete("/delete/:id", Validate(users.delete), UserController.destoy);

module.exports = routes;
