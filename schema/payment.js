const FilterYup = require("./yupFilters");

module.exports = {
  store: {
    body: FilterYup.paymentBody,
  },

  update: {
    body: FilterYup.paymentBody,
    params: FilterYup.paymentParams,
  },

  delete: {
    params: FilterYup.paymentParams,
  },
};
