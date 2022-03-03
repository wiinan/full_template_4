"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable("orders", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        userinfos_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "userinfos",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        payment_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "paymentmethods",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        price_total: {
          type: DataTypes.DECIMAL(11, 2),
          allowNull: false,
        },
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
        delivered_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("orders");
  },
};
