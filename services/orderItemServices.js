const { orderitems, users, orderitems } = require("../models");
const {
  handleSearchOne,
  handleError,
} = require("./handleServices/handlesUtils");

const store = async (req) => {
  const { name } = req.data;

  const allUser = await handleSearchOne(orderitems, name);

  handleError(allUser, "Type ja existe!");

  return await handleCreate(orderitems, req.data);
};

const index = async (req) => {
  const userInfoActive = await users.findOne({
    where: {
      id: req.currentUser.userLogin.id,
    },
  });

  if (!userInfoActive) {
    throw Error("Voce nao tem permissao");
  }

  return await orderitems.findAll();
};

module.exports = { store, index };
