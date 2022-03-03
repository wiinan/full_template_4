const paymentMethodServices = require("../services/paymentMethodServices");

class paymentMethodController {
  async store(req, res) {
    try {
      const paymentMethodRegistred = await paymentMethodServices.store(req);

      return res.status(200).json(paymentMethodRegistred);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const paymentMethod = await paymentMethodServices.index(req);

      return res.status(200).json(paymentMethod);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      await paymentMethodServices.update(req);
      return res.status(200).json({ "Endereço Atualizado": req.data });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async destoy(req, res) {
    try {
      await paymentMethodServices.destroy(req);

      return res.status(200).json({ "usuario deletado": req.params });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new paymentMethodController();
