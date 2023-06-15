const User = require('../models/users.model')
const Post = require('../models/posts.model')
const bcrypt = require('bcryptjs')
const { UnauthorizedError, BadRequest, NotFoundError } = require("../error");

/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The email of the user to be logged in.
 * @param {string} password - The password of the user to be logged in.
 * @returns {Promise<{user: object, token: string}>} - A promise that resolves to an object containing the logged in user and a token.
 * @throws {UnauthorizedError} - If the email or password is incorrect.
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = await user.generateAuthToken();
  return { user, token };
};

/**
 * Logout user
 * @param {Object} user - The user to logout.
 * @param {string} token - The token to remove from the user's tokens array.
 * @returns {Promise<void>}
 */
const logoutUser = async (user, token) => {
  user.tokens = user.tokens.filter((token) => {
    token.token != token;
  });
  return await user.save();
};

/**
 * Creates a new user profile with the given data.
 * @param {Object} body - The data to create the user profile.
 * @returns {Promise<{user: Object, token: string}>} The newly created user profile and authentication token.
 */
const createProfile = async (body) => {
  const user = await User.create(body);
  const token = await user.generateAuthToken();
  return { user, token };
};

/**
 * Update a user's profile with the given data
 * @param {Object} body - An object containing the updated fields and their values
 * @param {Object} user - An instance of a user model to update
 * @throws {BadRequest} If any of the fields being updated are not allowed
 * @returns {Promise<Object>} The updated user object
 */
const updateProfile = async (body, user) => {
  const allowedUpdates = ["username", "password", "age"];
  const updates = Object.keys(body);

  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    throw new BadRequest("Invalid Update");
  }

  updates.forEach((update) => {
    user[update] = body[update];
  });
  return await user.save();
};

/**
 * Deletes user's profile and all posts made by that user
 * @param {Object} user - An instance of a user model to delete
 * @returns {Promise<void>} A Promise that resolves when the user and posts are deleted
 */
const deleteProfile = async (user) => {
  await Post.deleteMany({ postedBy: user._id });
  await User.deleteOne({ email: user.email });
  return user;
};

/**
 * Search for users by their username.
 * @param {Object} query - The search query object.
 * @returns {Promise<Array>} An array of user objects that match the search query.
 * @throws {NotFoundError} If no users are found.
 */
const searchByUsername = async (query) => {
  const users = await User.find(
    {
      username: { $regex: query.search, $options: "i" },
    },
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  if (users.length === 0) {
    throw new NotFoundError("No users found!");
  }

  return users;
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  loginUser,
  logoutUser,
  searchByUsername,
};