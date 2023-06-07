const basicInfo = require("./basicInfo");
const post = require("./post");
const tags = require("./tags");

module.exports = {
  ...basicInfo,
  paths: {
    ...post,
  },
};
