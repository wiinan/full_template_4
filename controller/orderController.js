// const { QueryTypes } = require("sequelize");
// const Sequelize = require("sequelize");
const { orders, users, orderitems } = require("../models");
const orderServices = require("../services/orderServices");
const {
  handleSearchOne,
  handleSearchAdvanced,
} = require("../services/handleServices/handlesUtils");

class orderRouter {
  async store(req, res) {
    try {
      const cartAdded = await orderServices.store(req);
      return res.status(200).json(cartAdded);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const userInfo = await orderServices.index(req);
      return res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      await orderServices.update(req);

      return res.status(200).json({ "Ordem de compra Atualizado": req.params });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async updateRemoveProduct(req, res) {
    try {
      const DeletedUserInfo = await userInfoServices.updateRemoveProduct({
        currentUser: req.currentUser,
        filter: req.params,
      });

      return res.status(200).json({ "usuario deletado": DeletedUserInfo });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new orderRouter();
