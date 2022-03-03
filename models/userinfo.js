"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userinfos extends Model {
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
  userinfos.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      fullname: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      postal_code: { type: DataTypes.STRING, allowNull: false },
      county: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      modelName: "userinfos",
    }
  );
  return userinfos;
};
