const express = require("express");
const verifyToken = require("../controller/validatorController");

const routes = express.Router();

routes.post("/verifyToken", verifyToken.store);

module.exports = routes;
