const FilterYup = require("./yupFilters");

module.exports = {
  store: {
    body: FilterYup.productBody,
    params: FilterYup.productParams,
  },

  update: {
    body: FilterYup.productBody,
    params: FilterYup.productParams,
  },

  delete: {
    params: FilterYup.productParams,
  },
};
