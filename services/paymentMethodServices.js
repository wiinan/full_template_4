const { paymentmethod, users } = require("../models");
const {
  handleSearchOne,
  handleCreate,
  handleDestroy,
  handleSearchAll,
  handleError,
  handleEveryError,
} = require("./handleServices/handlesUtils");

const store = async (req) => {
  const { id } = req.currentUser.userLogin;

  const userInfoCreate = await handleSearchOne(users, id);

  handleError(!userInfoCreate, "Usuario não Autorizado!");

  const payment = await handleCreate(paymentmethod, {
    user_id: id,
    ...req.data,
  });

  const value =
    parseFloat(userInfoCreate.dataValues.balance) +
    parseFloat(payment.dataValues.purchasingPower);

  await users.update({ balance: value }, { where: { id } });

  return payment;
};

const index = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.query;

  const paymentMethodActive = await handleSearchOne(users, userLogin.id);

  handleError(!paymentMethodActive, "Voce nao tem permissao");

  if (!id) {
    return await handleSearchAll(paymentmethod, { user_id: userLogin.id });
  }

  return await handleSearchAll(paymentmethod, {
    user_id: userLogin.id,
    id,
  });
};

const update = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;
  const { purchasingPower } = req.data;

  const checkUser = await handleSearchOne(users, userLogin.id);
  const checkPayment = await handleSearchOne(paymentmethod, id);

  const selfUserInfor =
    checkUser.dataValues.id !== checkPayment.dataValues.user_id;

  handleEveryError(
    [checkUser, checkPayment, selfUserInfor],
    "Informacoes de Conta inconsistentes!"
  );

  const value =
    parseFloat(checkUser.dataValues.balance) + parseFloat(purchasingPower);

  await paymentmethod.update(
    { purchasingPower: purchasingPower, ...req.data },
    { where: { id } }
  );

  await users.update({ balance: value }, { where: { id: userLogin.id } });
};

const destroy = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;

  const userValid = await handleSearchOne(users, userLogin.id);
  const userInfoValid = await handleSearchOne(paymentmethod, id);

  const selfUser = userInfoValid.dataValues.user_id !== userValid.dataValues.id;

  handleEveryError(
    [userValid, userInfoValid, selfUser],
    "Esse usuario nao pertence ao Endereço!"
  );

  return await handleDestroy(paymentmethod, { id });
};

module.exports = {
  store,
  index,
  destroy,
  update,
};
