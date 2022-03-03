const { carts, users, products, images } = require("../models");

const {
  handleSearchOne,
  handleSearchAll,
  handleVerifyReturned,
  handleDestroy,
  handleEveryError,
} = require("./handleServices/handlesUtils");

module.exports = {
  store: async (req) => {
    const { userLogin } = req.currentUser;
    const { id } = req.filter;

    const isUser = await handleSearchOne(users, userLogin.id);
    const product = await handleSearchOne(products, id);
    const productInCart = await handleSearchAll(carts, {
      products_id: id,
      user_id: userLogin.id,
    });
    try {
      const diferentCheck = userLogin.id != product.dataValues.user_id;

      handleEveryError(
        [isUser, product, diferentCheck],
        "Voce Não Pode fazer isso!"
      );
// raw: true
      if (!productInCart[0]) {
        carts.create({
          user_id: userLogin.id,
          products_id: id,
          price: product.dataValues.price,
          where: { user_id: isUser.id },
        });
      }

      const calcular =
        parseFloat(productInCart[0].dataValues.price) +
        parseFloat(product.dataValues.price);

      return carts.update(
        {
          quantity: productInCart[0].dataValues.quantity + 1,
          price: calcular,
        },
        { where: { products_id: id } }
      );
    } catch (err) {
      throw err;
    }
  },

  index: async (req) => {
    const { id } = req.currentUser.userLogin;
    try {
      return await carts.findAll({
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
    } catch (err) {
      throw err;
    }
  },

  reducerProduct: async (req) => {
    const { userLogin } = req.currentUser;
    const { id } = req.filter;
    const cartBody = req.data;

    const isUser = await handleSearchOne(users, userLogin.id);
    const product = await handleSearchOne(products, id);
    const productInCart = await handleSearchAll(carts, {
      products_id: id,
      user_id: userLogin.id,
    });

    try {
      handleEveryError(
        [isUser, cartBody, productInCart[0], product],
        "Dados não Encontrados!"
      );

      const quantityAtt = parseInt(productInCart[0].dataValues.quantity) - 1;

      const priceAtt =
        parseFloat(productInCart[0].dataValues.price) -
        parseFloat(product.dataValues.price);

      handleVerifyReturned(
        productInCart[0].dataValues.quantity === 1,
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
    } catch (err) {
      throw err;
    }
  },

  RemoveProduct: async (req) => {
    const { userLogin } = req.currentUser;
    const { id } = req.filter;
    const checkUser = await handleSearchOne(users, userLogin.id);
    const product = await handleSearchOne(products, id);
    try {
      handleEveryError([checkUser, product], "Produto nao encontrado!");

      return await handleDestroy(carts, {
        products_id: id,
        user_id: userLogin.id,
      });
    } catch (err) {
      throw err;
    }
  },
};