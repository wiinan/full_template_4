const userInfoServices = require("../services/userInfoServices");

class userInfoController {
  async store(req, res) {
    try {
      const userInfoRegistred = await userInfoServices.store(req);
      return res.status(200).json(userInfoRegistred);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const userInfoActive = await userInfoServices.index(req);
      return res.status(200).json(userInfoActive);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      await userInfoServices.update(req);
      return res.status(200).json({ "Endereço Atualizado": req.data });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async destoy(req, res) {
    try {
      await userInfoServices.destroy(req);
      return res.status(200).json({ "usuario deletado": req.params });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new userInfoController();
