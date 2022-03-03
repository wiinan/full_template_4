const FilterYup = require("./yupFilters");

module.exports = {
  store: {
    body: FilterYup.orderitemsBody,
    params: validationParams,
  },

  update: {
    params: FilterYup.orderitemsParams,
  },

  delete: {
    params: FilterYup.orderitemsParams,
  },
};
