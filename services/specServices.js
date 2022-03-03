const { specs, users } = require("../models");
const {
  handleSearchAll,
  handleCreate,
  handleSearchOne,
  handleDestroy,
  handleError,
  handleVerifyReturned,
  handleEveryError,
} = require("./handleServices/handlesUtils");

module.exports = {
  store: async (req) => {
    const { name } = req.data;

    try {
      const allType = await handleSearchAll(specs, { name });

      handleError(allType[0], "type já existe");

      return await handleCreate(specs, req.data);
    } catch (err) {
      throw err;
    }
  },

  index: async (req) => {
    try {
      return await handleSearchAll(specs);
    } catch (err) {
      throw err;
    }
  },

  update: async (req) => {
    const { userLogin } = req.currentUser;
    const { id } = req.params;

    try {
      const spec = await handleSearchOne(specs, id);

      handleEveryError([userLogin.is_admin, spec], "Specs não existe!");

      const updatedUser = await specs.update(
        { ...req.data },
        { where: { id } }
      );

      return { updatedUser };
    } catch (err) {
      throw new Error(err);
    }
  },

  destroy: async (req) => {
    const { userLogin } = req.currentUser;

    const { id } = req.filter;

    const userExist = await handleSearchOne(specs, id);
    try {
      handleError(!userExist, "Usuario inexistente");
      handleVerifyReturned(!userLogin.is_admin, handleDestroy(specs, { id }));

      return await handleDestroy(specs, { id });
    } catch (err) {
      throw new Error(err);
    }
  },
};
