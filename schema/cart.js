const FilterYup = require("./yupFilters");

module.exports = {
  store: {
    params: FilterYup.cartParams,
  },

  update: {
    body: FilterYup.cartBody,
    params: FilterYup.cartParams,
  },

  delete: {
    params: FilterYup.cartParams,
  },

  updateRemoveProduct: {
    params: FilterYup.cartParams,
  },
};
