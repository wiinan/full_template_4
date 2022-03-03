"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
        },
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      spec_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "specs",
          key: "id",
        },
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      image_url: {
        type: DataTypes.STRING(65535),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
      },
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link_image: { type: DataTypes.STRING, allowNull: true },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("products");
  },
};
