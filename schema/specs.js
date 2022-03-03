const FilterYup = require("./yupFilters");

module.exports = {
  store: {
    body: FilterYup.specBody,
  },

  update: {
    body: FilterYup.specBody,
    params: FilterYup.specParams,
  },

  delete: {
    params: FilterYup.specParams,
  },
};
