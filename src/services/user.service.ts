import { User, IUser } from "../models/users.model";
import { Post } from "../models/posts.model";
import bcrypt from "bcryptjs";
import { UnauthorizedError, BadRequest } from "../error";

/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The email of the user to be logged in.
 * @param {string} password - The password of the user to be logged in.
 * @returns {Promise<{user: object, token: string}>} - A promise that resolves to an object containing the logged in user and a token.
 * @throws {UnauthorizedError} - If the email or password is incorrect.
 */
export const loginUser = async (email: string, password: string) => {
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
export const logoutUser = async (user: IUser, token: string) => {
  user.tokens = user.tokens?.filter((tokenObj) => {
    tokenObj.token != token;
  });
  await user.save();
};

/**
 * Creates a new user profile with the given data.
 * @param {Object} body - The data to create the user profile.
 * @returns {Promise<{user: Object, token: string}>} The newly created user profile and authentication token.
 */
export const createProfile = async (body: Partial<IUser>) => {
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
export const updateProfile = async (body: Partial<IUser>, user: IUser) => {
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
  await user.save();

  return user;
};

/**
 * Deletes user's profile and all posts made by that user
 * @param {Object} user - An instance of a user model to delete
 * @returns {Promise<void>} A Promise that resolves when the user and posts are deleted
 */
export const deleteProfile = async (user: IUser) => {
  await Post.deleteMany({ postedBy: user._id });
  await User.deleteOne({ email: user.email });
};
