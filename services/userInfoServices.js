const { userinfos, users } = require("../models");
const {
  handleSearchOne,
  handleCreate,
  handleSearchAll,
  handleDestroy,
  handleError,
  handleEveryError,
} = require("./handleServices/handlesUtils");

const store = async (req) => {
  const { userLogin } = req.currentUser;
  const userInfoCreate = await handleSearchOne(users, userLogin.id);

  handleError(!userInfoCreate, "Usuario não Autorizado!");

  return await handleCreate(userinfos, {
    user_id: userLogin.id,
    ...req.data,
  });
};

const index = async (req) => {
  const { id } = req.currentUser.userLogin;
  const userInfoActive = await handleSearchOne(users, id);

  if (!userInfoActive) {
    throw Error("Voce nao tem permissao");
  }

  return handleSearchAll(userinfos, { user_id: id });
};

const update = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;
  const checkUser = await handleSearchOne(users, userLogin.id);
  const checkUserInfo = await userinfos.handleSearchOne(id);
  const selfUserInfor =
    checkUser.dataValues.id !== checkUserInfo.dataValues.user_id;

  handleEveryError(
    [checkUser, checkUserInfo, selfUserInfor],
    "Informacoes de enderenço inconsistente!"
  );

  await userinfos.update({ ...req.data }, { where: { id } });
  return req.data;
};

const destroy = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;

  const userValid = await handleSearchOne(users, userLogin.id);
  const userInfoValid = await handleSearchOne(userinfos, id);

  const selfUser = userInfoValid.dataValues.user_id !== userValid.dataValues.id;

  handleEveryError(
    [userValid, userInfoValid, selfUser],
    "Esse usuario nao pertence ao Endereço!"
  );

  return await handleDestroy(userinfos, { id });
};

module.exports = {
  store,
  destroy,
  update,
  index,
};
