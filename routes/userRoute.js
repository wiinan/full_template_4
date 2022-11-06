const { Router } = require("express");
const Validate = require("../schema/validade");
const users = require("../schema/users");
const UserController = require("../controller/userController");
const verifyToken = require("../middlewares/verifyToken");

const imgController = require("../controller/imgController");

const passport = require("passport");
const googleAuthController = require("../controller/googleAuthController");
require("../config/googleAuth");

class UserRoutes {
  constructor() {
    this.routes = Router();

    this.userController = new UserController();
  }

  setup() {
    this.routes.post(
      "/login",
      Validate(users.login),
      this.userController.login
    );

    this.routes.post("/signup", Validate(users.store), this.userController.store);
    this.routes.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
    this.routes.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/api/login" }),
      googleAuthController.store
    );
    this.routes.get("/google/users", googleAuthController.index);
    this.routes.post("/google/local/:id", googleAuthController.loginGoogle);
    this.routes.get("/image", imgController.convertBase64);

    this.routes.use(verifyToken);

    this.routes.get("/google/user", googleAuthController.getUser);
    this.routes.get("/all", this.userController.index);
    this.routes.get("/profile", this.userController.actualUser);
    this.routes.put("/update/:id", Validate(users.update), this.userController.update);
    this.routes.delete("/delete/:id", Validate(users.delete), this.userController.destoy);

    return this.routes;
  }
}

module.exports = UserRoutes;
