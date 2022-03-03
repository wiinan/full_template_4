const { googleauth } = require("../models");
const googleAuthServices = require("../services/googleAuthServices");

require("dotenv").config();

class googleAuthController {
  async store(req, res) {
    try {
      const userLogin = await googleAuthServices.googleAuth(req);

      res.status(200).json(userLogin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async loginGoogle(req, res) {
    try {
      const userLogin = await googleAuthServices.googleApp(req);

      res.status(200).json(userLogin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const allUser = await googleauth.findAll();

      res.status(200).json(allUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUser(req, res) {
    try {
      const response = await googleAuthServices.indexUser(req);

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new googleAuthController();
