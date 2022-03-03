"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "user_id" });
      this.belongsTo(models.products, { foreignKey: "products_id" });
      this.hasMany(models.orderitems, { foreignKey: "order_id" });
    }
  }
  carts.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      products_id: { type: DataTypes.UUID, allowNull: true },
      quantity: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "carts",
    }
  );
  return carts;
};
