const { products, users, specs, images } = require("../models");
const {
  handleSearchOne,
  handleSearchAll,
  handleCreate,
  handleDestroy,
  handleError,
  handleEveryError,
  handleGenerate,
  handleSearchAdvanced,
} = require("./handleServices/handlesUtils");

const store = async (req) => {
  const { userLogin } = req.currentUser;
  const { name } = req.data;
  const { spec_id } = req.data;

  const userCreate = await handleSearchOne(users, userLogin.id);
  const carExist = await handleSearchAll(products, { name });

  let spec = await handleSearchAll(specs, { name: spec_id });

  handleError(!userCreate, "Usuario não Autorizado!");

  !spec[0] && (await handleCreate(specs, { name: spec_id }));

  spec = await handleSearchAll(specs, { name: spec_id });

  let slug = handleGenerate(name);

  if (carExist[0]) {
    const existSlug = carExist[0].slug;
    while (slug == existSlug) {
      let i = 1;
      slug = `${slug}${++i}`;
    }
  }

  delete req.data.spec_id;

  const productCreate = await handleCreate(products, {
    slug: slug,
    spec_id: spec[0].dataValues.id,
    user_id: userLogin.id,
    ...req.data,
  });

  return productCreate;
};

const index = async (req) => {
  const { mark, order = "name", reverse = "asc" } = req.query;

  const handleInclude = [
    {
      model: users,
      required: true,
      attributes: {
        exclude: ["id", "created_at", "updated_at"],
      },
    },
    {
      model: specs,
      required: true,
      attributes: {
        exclude: ["id", "created_at", "updated_at"],
      },
    },
    {
      model: images,
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    },
  ];

  if (!req.query.id && !mark) {
    return handleSearchAdvanced(products, {
      order: [[order, reverse]],
      include: handleInclude,
      attributes: {
        exclude: ["updated_at"],
      },
    });
  }
  if (!req.query.id && mark) {
    const searchMark = await handleSearchAll(specs, { name: mark });
    return await products.findAll({
      where: { spec_id: searchMark[0].id },
      include: handleInclude,
      attributes: {
        exclude: ["updated_at"],
      },
    });
  }

  return await products.findAll({
    where: { id: req.query.id },
    include: handleInclude,
    attributes: {
      exclude: ["updated_at"],
    },
  });
};

const update = async (req) => {
  const { userLogin } = req.currentUser;

  const { id } = req.filter;

  const checkUser = await handleSearchOne(users, userLogin.id);
  const checkProduct = await handleSearchOne(products, id);
  const selfUser = checkUser.dataValues.id !== checkProduct.dataValues.user_id;

  handleEveryError(
    [checkUser, checkProduct, selfUser],
    "Há inconsistencias de valores!"
  );

  return await products.update({ ...req.data }, { where: { id: id } });
};

const destroy = async (req) => {
  const { userLogin } = req.currentUser;

  const { id } = req.filter;

  const userValid = await handleSearchOne(users, userLogin.id);
  const productValid = await handleSearchOne(products, id);
  const foto = await handleSearchOne(images, productValid.dataValues.image_id);

  const selfProducts =
    productValid.dataValues.user_id !== userValid.dataValues.id;

  handleEveryError(
    [userValid, productValid, selfProducts],
    "Usuario nao esta logado!"
  );

  if (!foto) {
    return await handleDestroy(products, { id });
  }

  const filePath = `../ecommerce_template/${foto.dataValues.url}`;
  await handleDestroy(foto, { id });

  unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });

  return await handleDestroy(products, { id });
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
