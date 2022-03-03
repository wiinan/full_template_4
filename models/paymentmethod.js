"use strict";
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class paymentmethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  paymentmethod.init(
    {
      type: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      purchasingPower: { type: DataTypes.DECIMAL(13, 2), allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "paymentmethod",
      hooks: {
        beforeCreate: async (secret) => {
          try {
            const salt = await bcryptjs.genSalt();
            const passCrypted = bcryptjs
              .hashSync(secret.password, salt)
              .toString();
            secret.password = passCrypted;
          } catch (err) {
            throw err;
          }
        },
      },
    }
  );
  return paymentmethod;
};
