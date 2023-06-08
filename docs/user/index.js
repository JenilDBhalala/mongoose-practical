const createProfileDoc = require("./createProfile.docs");
const loginUserDocs = require("./loginUser.docs");
const logoutUserDocs = require("./logoutUser.docs");
const viewProfileDocs = require("./viewProfile.docs");
const updateProfileDocs = require("./updateProfile.docs");
const deleteProfileDocs = require("./deleteProfile.docs");

module.exports = {
  "/users/auth/signup": {
    ...createProfileDoc,
  },
  "/users/auth/login": {
    ...loginUserDocs,
  },
  "/users/auth/logout": {
    ...logoutUserDocs,
  },
  "/users/me": {
    ...viewProfileDocs,
    ...updateProfileDocs,
    ...deleteProfileDocs,
  },
};
