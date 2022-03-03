const orderItemServices = require("../services/orderItemServices");

class orderItems {
  async store(req, res) {
    try {
      const userInfoRegistred = await orderItemServices.store({
        data: req.data,
        currentUser: req.currentUser,
      });

      return res.status(200).json(userInfoRegistred);
    } catch (err) {
      res.status(500).json({ error: erserr.message });
    }
  }

  async index(req, res) {
    try {
      const userInfo = await orderItemServices.index(req);
      
      return res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new orderItems();
