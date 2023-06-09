var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User, Post } from "../models";
import bcrypt from "bcryptjs";
import { UnauthorizedError, BadRequest } from "../error";
/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The email of the user to be logged in.
 * @param {string} password - The password of the user to be logged in.
 * @returns {Promise<{user: object, token: string}>} - A promise that resolves to an object containing the logged in user and a token.
 * @throws {UnauthorizedError} - If the email or password is incorrect.
 */
export const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new UnauthorizedError("Invalid Credentials");
    }
    const isMatch = yield bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new UnauthorizedError("Invalid Credentials");
    }
    const token = yield user.generateAuthToken();
    return { user, token };
});
/**
 * Logout user
 * @param {Object} user - The user to logout.
 * @param {string} token - The token to remove from the user's tokens array.
 * @returns {Promise<void>}
 */
export const logoutUser = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    user.tokens = user.tokens.filter((tokenObj) => {
        tokenObj.token != token;
    });
    yield user.save();
});
/**
 * Creates a new user profile with the given data.
 * @param {Object} body - The data to create the user profile.
 * @returns {Promise<{user: Object, token: string}>} The newly created user profile and authentication token.
 */
export const createProfile = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.create(body);
    const token = yield user.generateAuthToken();
    return { user, token };
});
/**
 * Update a user's profile with the given data
 * @param {Object} body - An object containing the updated fields and their values
 * @param {Object} user - An instance of a user model to update
 * @throws {BadRequest} If any of the fields being updated are not allowed
 * @returns {Promise<Object>} The updated user object
 */
export const updateProfile = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedUpdates = ["username", "password", "age"];
    const updates = Object.keys(body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        throw new BadRequest("Invalid Update");
    }
    updates.forEach((update) => {
        user[update] = body[update];
    });
    yield user.save();
    return user;
});
/**
 * Deletes user's profile and all posts made by that user
 * @param {Object} user - An instance of a user model to delete
 * @returns {Promise<void>} A Promise that resolves when the user and posts are deleted
 */
export const deleteProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield Post.deleteMany({ postedBy: user._id });
    yield User.deleteOne({ email: user.email });
});
