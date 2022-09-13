const cartServices = require("../services/cartServices");

class cartController {
  async store(req, res) {
    try {
      const cartAdded = await cartServices.store(req);
      return res.status(200).json({
        "produtos adicionado": cartAdded,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    const filter = req.currentUser.userLogin.id;

    try {
      const allUserInfo = await cartServices.index(filter);
      return res.status(200).json(allUserInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      await cartServices.reducerProduct(req);

      return res.status(200).json({ "Carrinho Reduzido": req.params });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async RemoveProduct(req, res) {
    try {
      await cartServices.RemoveProduct(req);

      return res
        .status(200)
        .json({ "Produto Removido do carrinho": req.params });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new cartController();
