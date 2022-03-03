const express = require("express");
const Validate = require("../schema/validade");
const spec = require("../schema/specs");
const specController = require("../controller/specsController");
const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.use(verifyToken);

routes.get("/spec", specController.index);

routes.post("/spec", Validate(spec.store), specController.store);

routes.put("/spec/:id", Validate(spec.update), specController.update);

routes.delete("/spec/:id", Validate(spec.delete), specController.delete);

module.exports = routes;
