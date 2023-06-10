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
exports.countOfPosts = exports.searchByUsername = exports.findLatestComments = void 0;
const users_model_1 = require("../models/users.model");
const posts_model_1 = require("../models/posts.model");
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../error");
/**
 * Finds latest comments on a post using aggregate pipeline
 * @param {Object} params - The object containing the ID of the post.
 * @param {Object} query - The object containing the pagination parameters (skip and limit).
 * @returns {Promise<Array>} - A promise that resolves to an array of comments.
 * @throws {NotFoundError} - If there are no comments on the post.
 */
const findLatestComments = (id, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield posts_model_1.Post.aggregate([
        {
            $match: { _id: new mongoose_1.default.Types.ObjectId(id) },
        },
        {
            $unwind: "$comments",
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.commentBy",
                foreignField: "_id",
                as: "comments.abc",
            },
        },
        {
            $sort: { "comments.commentDate": -1 },
        },
        {
            $skip: isNaN(+skip) ? 0 : +skip,
        },
        {
            $limit: isNaN(+limit) ? 5 : +limit,
        },
        {
            $addFields: {
                "comments.user": { $first: "$comments.abc" },
            },
        },
        {
            $project: {
                _id: 0,
                "comments.comment": 1,
                "comments.commentBy": "$comments.user.username",
                "comments.commentDate": 1,
            },
        },
    ]);
    if (comments.length === 0) {
        throw new error_1.NotFoundError("There is no comments on post!");
    }
    return comments;
});
exports.findLatestComments = findLatestComments;
/**
 * Search for users by their username.
 * @param {Object} query - The search query object.
 * @returns {Promise<Array>} An array of user objects that match the search query.
 * @throws {NotFoundError} If no users are found.
 */
const searchByUsername = (search) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find({
        username: { $regex: search, $options: "i" },
    }, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
    });
    if (users.length === 0) {
        throw new error_1.NotFoundError("No users found!");
    }
    return users;
});
exports.searchByUsername = searchByUsername;
/**
 * Counts the number of posts based on their tags
 * @returns {Promise<Array>} Array of objects containing tag and count of posts for each tag
 * @throws {NotFoundError} If no posts are found
 */
const countOfPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_model_1.Post.aggregate([
        {
            $unwind: "$tags",
        },
        {
            $group: { _id: "$tags", count: { $sum: 1 } },
        },
    ]);
    if (posts.length === 0) {
        throw new error_1.NotFoundError("No posts found!");
    }
    return posts;
});
exports.countOfPosts = countOfPosts;
