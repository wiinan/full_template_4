const userServices = require("../services/userServices");

require("dotenv").config();

class UserController {
  async store(req, res) {
    try {
      const userRegistred = await userServices.store(req);

      res.status(200).json(userRegistred);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const userLogin = await userServices.googleApp(req);

      return res.status(200).json({ "UserLogin": userLogin });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const user = await userServices.index(req);

      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async actualUser(req, res) {
    try {
      const user = await userServices.actualUser(req);

      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await userServices.update(req);

      return res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async destoy(req, res) {
    try {
      const DeletedUser = await userServices.destroy(req);

      return res.status(200).json({ "usuario deletado": DeletedUser });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new UserController();
