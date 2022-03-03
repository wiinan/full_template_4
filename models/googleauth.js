"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class googleauth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  googleauth.init(
    {
      sessionID: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      photo_url: { type: DataTypes.STRING },
      general_info: { type: DataTypes.JSON, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "googleauth",
    }
  );
  return googleauth;
};
