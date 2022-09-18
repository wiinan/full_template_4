const { specs } = require("../models");
const {
  handleSearchAll,
  handleCreate,
  handleSearchOne,
  handleDestroy,
  handleError,
  handleVerifyReturned,
  handleEveryError,
} = require("./handleServices/handlesUtils");

const store = async (data) => {
  const { name } = data;

  const allType = await handleSearchAll(specs, { name });

  handleError(allType[0], "Marca já existe");

  return await handleCreate(specs, data);
};

const index = () => handleSearchAll(specs);

const update = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.params;

  const spec = await handleSearchOne(specs, id);

  handleEveryError([userLogin.is_admin, spec], "Marca não existe!");

  const updatedUser = await specs.update({ ...req.data }, { where: { id } });

  return { updatedUser };
};

const destroy = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;

  const userExist = await handleSearchOne(specs, id);

  handleError(!userExist, "Usuario inexistente");
  handleVerifyReturned(!userLogin.is_admin, handleDestroy(specs, { id }));

  return await handleDestroy(specs, { id });
};

module.exports = {
  store,
  update,
  destroy,
  index,
};
