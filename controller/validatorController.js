const jwt = require("jsonwebtoken");
require("dotenv").config();

class verifyToken {
  async store(req, res) {
    const token = req.body.token || "";
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      return res.status(200).send({ valid: true });
    });
  }
}

module.exports = new verifyToken();
