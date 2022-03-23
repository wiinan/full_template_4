const { users } = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');
const bcryptjs = require("bcryptjs");
const {
  handleSearchOne,
  handleSearchAll,
  handleCreate,
  handleDestroy,
  handleError,
  handleVerifyReturned,
} = require("./handleServices/handlesUtils");

module.exports = {
  store: async (req) => {
    const { email } = req.data;

    try {
      const allUser = await handleSearchAll(users, { email });

      handleError(allUser, "Email ja existe!");

      return await handleCreate(users, req.data);
    } catch (err) {
      throw err;
    }
  },

  login: async (req) => {
    const { email, password } = req.data;

    try {
      const sessionInitialized = await handleSearchAll(users, { email });

      handleError(!sessionInitialized[0], "Usuario nao encontrado!");

      const isValid = bcryptjs.compareSync(
        password,
        sessionInitialized[0].dataValues.password
      );

      const userLogin = sessionInitialized[0];

      handleError(!isValid, "Senha invalida!");

      const userLogged = jwt.sign({ userLogin }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      return { userLogged, sessionInitialized };
    } catch (err) {
      throw err;
    }
  },

  index: async (filter) => {
    console.log(filter)

    const { userLogin } = req.currentUser;
    const { page, email } = filter;

    try {
      const userActive = await handleSearchOne(
        users,
        userLogin.id
      );

      if (!userActive.is_admin) {
        return handleSearchOne(users, userLogin.id);
      }

      // return handleSearchAll(users);
      return users.findAll({limit: 2, offset: page, where: email })
    } catch (err) {
      throw err;
    }
  },

  actualUser: async (req) => {
    try {
      return await users.findOne({
        where: { id: req.currentUser.userLogin.id },
      });
    } catch (err) {
      throw err;
    }
  },

  update: async (req) => {
    const { userLogin } = req.currentUser;
    const { password } = req.data;

    const sessionInitialized = await handleSearchOne(users, userLogin.id);

    try {
      handleError(!sessionInitialized, "Usuario inexistente");

      const passValid = bcryptjs.compareSync(
        password,
        sessionInitialized.dataValues.password
      );

      handleError(!passValid, "Senha Invalida");

      await users.update({ ...req.data }, { where: { id: userLogin.id } });

      return { ...req };
    } catch (err) {
      throw new Error(err);
    }
  },

  destroy: async (req) => {
    const { userLogin } = req.currentUser;

    const { id } = req.filter;

    try {
      const userExist = await handleSearchOne(users, id);

      handleError(!userExist, "Usuario inexistente");

      handleVerifyReturned(
        !userLogin.isAdmin,
        handleDestroy(users, { id: userLogin.id })
      );

      return await handleDestroy(users, { id });
    } catch (err) {
      throw new Error(err);
    }
  },
};
