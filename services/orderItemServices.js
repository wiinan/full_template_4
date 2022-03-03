const { orderitems, users, orderitems } = require("../models");
const {
  handleSearchOne,
  handleError,
} = require("./handleServices/handlesUtils");

module.exports = {
  store: async (req) => {
    const { name } = req.data;

    const allUser = await handleSearchOne(orderitems, name);

    try {
      handleError(allUser, "Type ja existe!");

      return await handleCreate(orderitems, req.data);
    } catch (err) {
      throw err;
    }
  },

  index: async (req) => {
    try {
      const userInfoActive = await users.findOne({
        where: {
          id: req.currentUser.userLogin.id,
        },
      });

      if (!userInfoActive) {
        throw Error("Voce nao tem permissao");
      }

      return await orderitems.findAll();
    } catch (err) {
      throw err;
    }
  },
};
