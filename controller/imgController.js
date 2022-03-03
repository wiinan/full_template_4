const imgServices = require("../services/imgServices");
const { images } = require("../models");

class ImgController {
  async store(req, res) {
    try {
      const foto = await imgServices.storeService(req);
      return res.json(foto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async convertBase64(req, res) {
    try {
      const allImg = await imgServices.index(req);
      res.status(200).json(allImg);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const foto = await imgServices.updateService(req);
      return res.json(foto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await imgServices.deleteService(req);
      return res.status(200).json({ "foto deletada": req.params });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ImgController();
