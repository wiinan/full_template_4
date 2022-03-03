"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.userinfos, { foreignKey: "userinfos_id" });
      this.belongsTo(models.paymentmethod, { foreignKey: "payment_id" });
      this.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }

  orders.init(
    {
      user_id: { type: DataTypes.STRING, allowNull: false },
      userinfos_id: { type: DataTypes.INTEGER, allowNull: false },
      payment_id: { type: DataTypes.INTEGER, allowNull: false },
      price_total: { type: DataTypes.DECIMAL, allowNull: false },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_delivered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      delivered_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "orders",
    }
  );
  return orders;
};
