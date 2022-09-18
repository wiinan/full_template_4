const { carts, users, products, images } = require("../models");

const {
  handleSearchOne,
  handleSearchAll,
  handleVerifyReturned,
  handleDestroy,
  handleEveryError,
  handleSearch,
} = require("./handleServices/handlesUtils");

const store = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;

  const isUser = await handleSearchOne(users, userLogin.id);
  const product = await handleSearchOne(products, id);
  const productInCart = await handleSearchAll(carts, {
    products_id: id,
    user_id: userLogin.id,
  });
  const diferentCheck = userLogin.id != product.dataValues.user_id;

  handleEveryError(
    [isUser, product, diferentCheck],
    "Voce Não Pode fazer isso!"
  );

  if (!productInCart[0]) {
    carts.create({
      user_id: userLogin.id,
      products_id: id,
      price: product.price,
      where: { user_id: isUser.id },
    });
  }

  const calcular =
    parseFloat(productInCart[0].price) + parseFloat(product.price);

  return carts.update(
    {
      quantity: productInCart[0].quantity + 1,
      price: calcular,
    },
    { where: { products_id: id } }
  );
};

const index = (id) =>
  carts.findAll({
    where: { user_id: id },
    include: [
      {
        model: products,
        required: true,
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        include: [
          {
            model: images,
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          },
        ],
      },
    ],
  });

const reducerProduct = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;
  const cartBody = req.data;

  const isUser = await handleSearchOne(users, userLogin.id);
  const product = await handleSearchOne(products, id);
  const productInCart = await handleSearch(carts, {
    products_id: id,
    user_id: userLogin.id,
  });

  handleEveryError(
    [isUser, cartBody, productInCart, product],
    "Dados não Encontrados!"
  );

  const quantityAtt = parseInt(productInCart.quantity) - 1;

  const priceAtt =
    parseFloat(productInCart.dataValues.price) -
    parseFloat(product.dataValues.price);

  handleVerifyReturned(
    productInCart.quantity === 1,
    handleDestroy(carts, { products_id: id, user_id: userLogin.id })
  );

  return await carts.update(
    { price: priceAtt, quantity: quantityAtt },
    {
      where: {
        id: cartBody.id,
      },
    }
  );
};

const RemoveProduct = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;
  const checkUser = await handleSearchOne(users, userLogin.id);
  const product = await handleSearchOne(products, id);

  handleEveryError([checkUser, product], "Produto nao encontrado!");

  return await handleDestroy(carts, {
    products_id: id,
    user_id: userLogin.id,
  });
};

module.exports = {
  store,
  reducerProduct,
  RemoveProduct,
  index,
};
