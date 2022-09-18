const {
  carts,
  users,
  orders,
  products,
  userinfos,
  orderitems,
  paymentmethod,
} = require("../models");
const { Op } = require("sequelize");
const {
  handleSearchOne,
  handleSearchAll,
  handleCreate,
  handleDestroy,
  handleError,
  handleVerifyReturned,
  handleEveryError,
  handleSearchAdvanced,
} = require("./handleServices/handlesUtils");

const store = async (req) => {
  const { id } = req.currentUser.userLogin;
  const { userinfos_id, payment_id } = req.body;

  const cart = await handleSearchAll(carts, { user_id: id });
  const user = await handleSearchOne(users, id);
  const userInfo = await handleSearchOne(userinfos, userinfos_id);
  const payment = await handleSearchOne(paymentmethod, payment_id);

  handleEveryError([user, cart[0], userInfo, payment], "inconsistencias!");

  const cartItems = cart.map((value) => {
    return value;
  });

  const totalOrderValue = cart.reduce((acc, value) => {
    acc = parseFloat(acc) + parseFloat(value.dataValues.price);
    return acc;
  }, 0);

  handleError(
    totalOrderValue > user.dataValues.balance,
    "Saldo nao e suficiente!"
  );

  const newCarts = await handleCreate(orders, {
    userinfos_id: userinfos_id,
    payment_id: payment_id,
    user_id: id,
    price_total: totalOrderValue,
    ...req.data,
  });

  await handleCreate(orderitems, {
    products: cartItems,
    user_id: id,
    price_total: totalOrderValue,
    order_id: newCarts.dataValues.id,
  });

  await handleDestroy(carts, { user_id: id });

  const value = parseFloat(user.dataValues.balance) - totalOrderValue;

  await users.update({ balance: value }, { where: { id } });

  return newCarts;
};

const index = async (req) => {
  const { id } = req.currentUser.userLogin;
  const searchOrder = req.query;

  const userInfoActive = await handleSearchOne(users, id);

  if (!searchOrder.id && !userInfoActive.dataValues.is_admin) {
    const order = await handleSearchAdvanced(
      orderitems,
      {
        include: [
          { model: orders, required: true },
          {
            model: users,
            required: true,
            attributes: {
              exclude: [
                "id",
                "is_admin",
                "password",
                "created_at",
                "updated_at",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      },
      { user_id: id }
    );

    return order;
  }

  if (searchOrder.id && !userInfoActive.dataValues.is_admin) {
    const allOrders = await handleSearchOne(orders, searchOrder.id);

    if (!allOrders.id) {
      throw Error("Ainda nao tem compras!");
    }

    return await handleSearchAdvanced(
      orderitems,
      {
        include: [
          {
            model: orders,
            required: true,
          },
          {
            model: users,
            required: true,
            attributes: {
              exclude: [
                "id",
                "is_admin",
                "password",
                "created_at",
                "updated_at",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      },
      { id: searchOrder.id }
    );
  }

  if (userInfoActive.dataValues.is_admin && searchOrder.id) {
    return await handleSearchAdvanced(orderitems, {
      include: [
        {
          model: orders,
          required: true,
        },
        {
          model: users,
          required: true,
          attributes: {
            exclude: ["id", "is_admin", "password", "created_at", "updated_at"],
          },
        },
      ],
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });
  }

  if (userInfoActive.dataValues.is_admin && !searchOrder.id) {
    return await handleSearchAdvanced(orderitems, {
      include: [
        {
          model: orders,
          required: true,
        },
        {
          model: users,
          required: true,
          attributes: {
            exclude: ["id", "is_admin", "password", "created_at", "updated_at"],
          },
        },
      ],
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });
  }
};

const update = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;

  const user = await handleSearchOne(users, userLogin.id);
  let order = await handleSearchAll(orders, {
    user_id: userLogin.id,
    id: id,
  });

  handleEveryError([user, order], "Não Registros!");

  await orders.update(
    { ...req.data },
    {
      where: {
        [Op.and]: [{ user_id: userLogin.id }, { id }],
      },
    }
  );

  order = await handleSearchAll(orders, { user_id: userLogin.id, id });

  handleVerifyReturned(
    order[0].dataValues.is_delivered,
    orders.update(
      { delivered_at: new Date() },
      {
        where: {
          [Op.and]: [{ user_id: userLogin.id }, { id }],
        },
      }
    )
  );

  return order;
};

const updateRemoveProduct = async (req) => {
  const { userLogin } = req.currentUser;
  const { id } = req.filter;

  const checkUser = await handleSearchOne(carts, id);

  const product = await handleSearchOne(products, id);

  const cart = await cart.findAll(id);

  handleError(!checkUser, "Usuario nao esta logado!");

  handleVerifyReturned(!cart, handleCreate(carts, { id_user: userLogin.id }));

  handleError(!product, "Producto nao encontrado!");

  const ProductRemoveCart = await handleDestroy(carts, { id_products: id });

  return ProductRemoveCart;
};

module.exports = {
  store,
  index,
  updateRemoveProduct,
  update,
};
