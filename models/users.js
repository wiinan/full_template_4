"use strict";
const bcriptjs = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  users.init(
    {
      name: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },

      password: { type: DataTypes.STRING, allowNull: false },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      balance: { type: DataTypes.DECIMAL(13, 2), allowNull: true },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "users",
      hooks: {
        beforeCreate: async (user) => {
          try {
            const salt = await bcriptjs.genSalt();
            const passCrypted = bcriptjs
              .hashSync(user.password, salt)
              .toString();
            user.password = passCrypted;
          } catch (err) {
            throw err;
          }
        },
      },
    }
  );
  return users;
};
