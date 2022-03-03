const FilterYup = require("./yupFilters");

module.exports = {
  store: {
    body: FilterYup.userinfoBody,
  },

  update: {
    body: FilterYup.userinfoBody,
    params: FilterYup.userinfoParams,
  },

  delete: {
    params: FilterYup.userinfoParams,
  },
};
