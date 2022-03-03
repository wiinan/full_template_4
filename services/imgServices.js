const { unlink } = require("fs");
const {
  handleSearchOne,
  handleDestroy,
  handleError,
  handleCreate,
  handleSearchAll,
} = require("./handleServices/handlesUtils");
const { products, images } = require("../models");

module.exports = {
  storeService: async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const foto = await handleCreate(images, {
        url: `/views/images/${name}`,
        ...req.body,
      });

      products.update({ image_id: foto.dataValues.id }, { where: { id } });

      return foto;
    } catch (err) {
      throw err;
    }
  },

  index: async (req) => {
    try {
      return handleSearchAll(images);
    } catch (err) {
      throw err;
    }
  },

  deleteService: async (req) => {
    const { id } = req.params;

    const foto = await handleSearchOne(images, id);

    try {
      handleError(!foto, "Imagem nao encontrada!");

      const filePath = `../ecommerce_template/views/images/${foto.dataValues.filename}`;

      await products.update({ image_id: null }, { where: { image_id: id } });
      await handleDestroy(images, { id });

      unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    } catch (err) {
      throw err;
    }
  },
};
