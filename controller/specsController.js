const specServices = require("../services/specServices");

class typeController {
  async store(req, res) {
    try {
      const cartAdded = await specServices.store(req);
      return res.status(200).json(cartAdded);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const allSpecs = await specServices.index(req);
      return res.status(200).json(allSpecs);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      await specServices.update(req);

      return res.status(200).json({ "spec Atualizado": req.params });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      await specServices.destroy(req);

      return res.status(200).json({ "spec deletado": req.params });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new typeController();
