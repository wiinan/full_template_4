"use strict";
const { Model } = require("sequelize");
const { v4: uuid } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "user_id" });
      this.belongsTo(models.specs, { foreignKey: "spec_id" });
      this.belongsTo(models.images, { foreignKey: "image_id" });
      this.hasMany(models.carts, { foreignKey: "products_id" });
    }
  }

  products.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      spec_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      slug: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      image_url: { type: DataTypes.STRING(65535), allowNull: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        max: 5,
      },
      count_in_stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      description: { type: DataTypes.STRING, allowNull: false },
      link_image: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "products",
      hooks: {
        beforeCreate: async (product) => {
          product.id = uuid();
        },
      },
    }
  );

  return products;
};
