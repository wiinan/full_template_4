"use strict";
// const { QueryTypes } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderitems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async associate(models) {
      // const userInfo = await sequelize.query(
      //   "select users.name, users.email, userinfos.fullname, userinfos.address, userinfos.postal_code, userinfos.payment_type ,orderitems.id, orderitems.user_id, orders.id, orders.user_id, orders.price_total, orders.is_paid, orderitems.products, orders.is_delivered from orders inner join orderitems on orderitems.user_id = orders.id inner join users on users.id = orders.user_id inner join userinfos on userinfos.id = orders.user_id",
      //   { type: QueryTypes.SELECT }
      // );

      this.belongsTo(models.orders, { foreignKey: "order_id" });
      this.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  orderitems.init(
    {
      user_id: { type: DataTypes.NUMBER, allowNull: false },
      order_id: { type: DataTypes.NUMBER, allowNull: false },
      products: { type: DataTypes.JSON, allowNull: false },
      price_total: { type: DataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "orderitems",
    }
  );
  return orderitems;
};
