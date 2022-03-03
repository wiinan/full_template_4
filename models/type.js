"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Dataspecs) => {
  class specs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  specs.init(
    {
      name: { type: Dataspecs.STRING, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "specs",
    }
  );
  return specs;
};
