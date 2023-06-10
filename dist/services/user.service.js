"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.logoutUser = exports.loginUser = void 0;
const users_model_1 = require("../models/users.model");
const posts_model_1 = require("../models/posts.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../error");
/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The email of the user to be logged in.
 * @param {string} password - The password of the user to be logged in.
 * @returns {Promise<{user: object, token: string}>} - A promise that resolves to an object containing the logged in user and a token.
 * @throws {UnauthorizedError} - If the email or password is incorrect.
 */
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findOne({ email });
    if (!user) {
        throw new error_1.UnauthorizedError("Invalid Credentials");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new error_1.UnauthorizedError("Invalid Credentials");
    }
    const token = yield user.generateAuthToken();
    return { user, token };
});
exports.loginUser = loginUser;
/**
 * Logout user
 * @param {Object} user - The user to logout.
 * @param {string} token - The token to remove from the user's tokens array.
 * @returns {Promise<void>}
 */
const logoutUser = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    user.tokens = (_a = user.tokens) === null || _a === void 0 ? void 0 : _a.filter((tokenObj) => {
        tokenObj.token != token;
    });
    yield user.save();
});
exports.logoutUser = logoutUser;
/**
 * Creates a new user profile with the given data.
 * @param {Object} body - The data to create the user profile.
 * @returns {Promise<{user: Object, token: string}>} The newly created user profile and authentication token.
 */
const createProfile = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.create(body);
    const token = yield user.generateAuthToken();
    return { user, token };
});
exports.createProfile = createProfile;
/**
 * Update a user's profile with the given data
 * @param {Object} body - An object containing the updated fields and their values
 * @param {Object} user - An instance of a user model to update
 * @throws {BadRequest} If any of the fields being updated are not allowed
 * @returns {Promise<Object>} The updated user object
 */
const updateProfile = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedUpdates = ["username", "password", "age"];
    const updates = Object.keys(body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        throw new error_1.BadRequest("Invalid Update");
    }
    updates.forEach((update) => {
        user[update] = body[update];
    });
    yield user.save();
    return user;
});
exports.updateProfile = updateProfile;
/**
 * Deletes user's profile and all posts made by that user
 * @param {Object} user - An instance of a user model to delete
 * @returns {Promise<void>} A Promise that resolves when the user and posts are deleted
 */
const deleteProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield posts_model_1.Post.deleteMany({ postedBy: user._id });
    yield users_model_1.User.deleteOne({ email: user.email });
});
exports.deleteProfile = deleteProfile;
