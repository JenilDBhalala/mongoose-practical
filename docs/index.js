const basicInfo = require("./basicInfo");
const comment = require("./comment");
const components = require("./components");
const post = require("./post");
const query = require("./query");
const security = require("./security");
const user = require("./user");

module.exports = {
  ...basicInfo,
  ...components,
  ...security,
  paths: {
    ...user,
    ...post,
    ...comment,
    ...query,
  },
};
