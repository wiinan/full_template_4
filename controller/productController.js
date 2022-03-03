const productServices = require("../services/productServices");
const { products, users, specs, images } = require("../models");
const { Op } = require("sequelize");

class productController {
  async store(req, res) {
    try {
      const newProduct = await productServices.store(req);

      return res.status(200).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const product = await productServices.index(req);

      return res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async myIndex(req, res) {
    const { userLogin } = req.currentUser;
    try {
      if (req.query.id) {
        const product = await products.findAll(
          {
            include: [
              {
                model: users,
                required: true,
                attributes: {
                  exclude: ["id", "created_at", "updated_at"],
                },
              },
              {
                model: specs,
                required: true,
                attributes: {
                  exclude: ["id", "created_at", "updated_at"],
                },
              },
              {
                model: images,
                attributes: {
                  exclude: ["created_at", "updated_at"],
                },
              },
            ],
            attributes: {
              exclude: ["updated_at"],
            },
          },
          {
            where: { [Op.and]: [{ user_id: userLogin }, { id: req.query.id }] },
          }
        );

        return res.status(200).json(product);
      }

      const product = await products.findAll({
        include: [
          {
            model: users,
            required: true,
            attributes: {
              exclude: ["id", "created_at", "updated_at"],
            },
          },
          {
            model: specs,
            required: true,
            attributes: {
              exclude: ["id", "created_at", "updated_at"],
            },
          },
          {
            model: images,
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          },
        ],
        attributes: {
          exclude: ["updated_at"],
        },
        where: { user_id: userLogin.id },
      });

      return res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      await productServices.update(req);

      return res.status(200).json({ "produto atualizado": req.params });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async destoy(req, res) {
    try {
      await productServices.destroy(req);
      return res.status(200).json({ "produto deletado": req.params });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new productController();
