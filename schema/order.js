const FilterYup = require("./yupFilters");

module.exports = {
  store: {
    params: FilterYup.orderParams,
  },

  update: {
    body: FilterYup.orderBody,
    params: FilterYup.orderParams,
  },

  delete: {
    params: FilterYup.orderParams,
  },

  updateRemoveProduct: {
    params: FilterYup.orderParams,
  },
};
