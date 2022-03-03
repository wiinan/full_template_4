const express = require("express");
const imgController = require("../controller/imgController");
const uploadImg = require("../middlewares/multerVerify");
// const Validate = require("../schema/validade");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.post("/image/:id", uploadImg.create, imgController.store);

routes.get("/image", uploadImg.create, imgController.convertBase64);

routes.delete("/image/:id", imgController.delete);

module.exports = routes;
