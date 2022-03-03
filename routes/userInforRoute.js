const express = require("express");
const Validate = require("../schema/validade");
const userInfo = require("../schema/userInfo");
const userInfoController = require("../controller/userInfoController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.get("/userinfo", userInfoController.index);

routes.post("/userinfo", Validate(userInfo.store), userInfoController.store);

routes.put(
  "/userinfo/:id",
  Validate(userInfo.update),
  userInfoController.update
);

routes.delete(
  "/userinfo/:id",
  Validate(userInfo.delete),
  userInfoController.destoy
);

module.exports = routes;
