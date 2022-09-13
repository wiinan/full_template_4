const { Op } = require("sequelize");

class handleUtils {
  handleSearchAll = (model, filter) => {
    return model.findAll({
      where: { [Op.and]: [filter] },
      raw: true
    });
  };

  handleSearch = (model, filter) => {
    return model.findOne({
      where: filter,
      raw: true
    })
  }

  handleSearchOne = (model, filter) => {
    return model.findByPk(filter, { raw: true });
  };

  handleSearchAdvanced = (model, logic, filter) => {
    return model.findAll({ ...logic }, { where: [filter] });
  };

  handleCreate = (model, value) => {
    try {
      return model.create({ ...value });
    } catch (err) {
      throw new Error({ "Falha na Criação": err });
    }
  };

  handleSimpleCreate = (model, filter) => {
    try {
      return model.create({
        where: [filter],
      });
    } catch (err) {
      throw new Error({ "Falha na Criação": err });
    }
  };

  handleDestroy = (model, filter) => {
    try {
      return model.destroy({
        where: { [Op.and]: [filter] },
      });
    } catch (err) {
      throw new Error({ Falhou: err });
    }
  };

  handleError = (verify, err) => {
    if (verify) throw new Error(err);
  };

  handleEveryError = (verify, err) => {
    const verifyResult = verify.every((elem) => {
      return elem != undefined;
    });

    if (!verifyResult) throw new Error(err);
  };

  handleVerifyReturned = async (verify, value) => {
    if (verify) await value;
    return;
  };

  handleVerify = (verify, value) => {
    if (verify) value;
  };

  handleGenerate = (name) => {
    return `${name.substr(0, 2)}${name.substr(-3)}`.toUpperCase();
  };
}

module.exports = new handleUtils();
