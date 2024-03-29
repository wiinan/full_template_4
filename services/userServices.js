const { users } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const {
  handleSearchOne,
  handleSearchAll,
  handleCreate,
  handleDestroy,
  handleError,
  handleVerifyReturned,
  handleSearch,
} = require("./handleServices/handlesUtils");

const store = async (data) => {
  const { email } = data;
  const allUser = await handleSearchAll(users, { email });

  handleError(allUser.length, "Email ja existe!");

  return await handleCreate(users, data);
};

const login = async (data) => {
  const { email, password } = data;
  const sessionInitialized = await handleSearch(users, { email });

  handleError(!sessionInitialized, "Usuario nao encontrado!");

  const isValid = bcryptjs.compareSync(password, sessionInitialized.password);
  const userLogin = sessionInitialized;

  handleError(!isValid, "Senha invalida!");

  const userLogged = jwt.sign({ userLogin }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  return { userLogged, sessionInitialized };
};

const index = async (filter) => {
  const { userLogin } = req.currentUser;
  const { page, email } = filter;

  const userActive = await handleSearchOne(users, userLogin.id);

  if (!userActive.is_admin) {
    return handleSearchOne(users, userLogin.id);
  }

  if (!filter) {
    return handleSearchAll(users);
  }

  return users.findAll({ limit: 5, offset: page, where: email });
};

const actualUser = (id) => {
  return users.findOne({
    where: { id },
  });
};

const update = async (req) => {
  const { userLogin } = req.currentUser;
  const { password } = req.data;
  const sessionInitialized = await handleSearchOne(users, userLogin.id);

  handleError(!sessionInitialized, "Usuario inexistente");

  const passValid = bcryptjs.compareSync(password, sessionInitialized.password);

  handleError(!passValid, "Senha Invalida");

  await users.update({ ...req.data }, { where: { id: userLogin.id } });

  return { ...req };
};

const destroy = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;
  const userExist = await handleSearchOne(users, id);

  handleError(!userExist, "Usuario inexistente");

  handleVerifyReturned(
    !userLogin.isAdmin,
    handleDestroy(users, { id: userLogin.id })
  );

  return await handleDestroy(users, { id });
};

module.exports = {
  store,
  login,
  index,
  destroy,
  update,
  actualUser,
};
