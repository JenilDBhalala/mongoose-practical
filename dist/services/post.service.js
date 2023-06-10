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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCommentsOnPost = exports.addComment = exports.deletePost = exports.updatePost = exports.addPost = exports.fetchPostById = exports.fetchAllPosts = void 0;
const posts_model_1 = require("../models/posts.model");
const error_1 = require("../error");
/**
 * Fetches all posts created by a user.
 * @param {Object} user - The user object.
 * @returns {Promise<Array>} An array of posts.
 * @throws {NotFoundError} If no posts are found.
 */
const fetchAllPosts = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_model_1.Post.find({ postedBy: user._id });
    if (posts.length === 0)
        throw new error_1.NotFoundError("posts not found!");
    return posts;
});
exports.fetchAllPosts = fetchAllPosts;
/**
 * Fetches a post by ID that was created by a user.
 * @param {Object} user - The user object.
 * @param {Object} params - The request params.
 * @returns {Promise<Object>} The post object.
 * @throws {NotFoundError} If the post is not found.
 */
const fetchPostById = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Post.findOne({ postedBy: user._id, _id: id });
    if (!post)
        throw new error_1.NotFoundError("post not found!");
    return post;
});
exports.fetchPostById = fetchPostById;
/**
 * Creates a new post.
 * @param {Object} body - The request body.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The post object.
 */
const addPost = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Post.create(Object.assign(Object.assign({}, body), { postedBy: user._id }));
    return post;
});
exports.addPost = addPost;
/**
 * Updates a post by ID.
 * @param {Object} body - The request body.
 * @param {Object} params - The request parameters.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the post is not found.
 */
const updatePost = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Post.findById(id);
    if (!post) {
        throw new error_1.NotFoundError("post not found!");
    }
    yield post.updateOne(Object.assign({}, body), { runValidators: true });
});
exports.updatePost = updatePost;
/**
 * Deletes a post by ID.
 * @param {Object} user - The user object.
 * @param {Object} params - The request parameters.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the post is not found.
 */
const deletePost = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Post.findOne({ postedBy: user._id, _id: id });
    if (!post)
        throw new error_1.NotFoundError("post not found!");
    post.deleteOne();
});
exports.deletePost = deletePost;
/**
 * Adds a comment to a post by ID.
 * @param {Object} params - The request parameters.
 * @param {Object} body - The request body.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The updated post object.
 * @throws {NotFoundError} If the post is not found.
 */
const addComment = (id, body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Post.findById(id);
    if (!post) {
        throw new error_1.NotFoundError("post not found!");
    }
    post.comments.push({ comment: body.comment, commentBy: user._id });
    yield post.save();
    return post;
});
exports.addComment = addComment;
/**
 * Fetches all comments on a post by ID.
 * @param {Object} params - The request parameters.
 * @returns {Promise<Array>} An array of comment objects.
 * @throws {NotFoundError} If there are no comments on the post.
 */
const fetchAllCommentsOnPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Post.findById(id).populate("comments.commentBy", { _id: 0, username: 1 });
    if (!post || post.comments.length === 0) {
        throw new error_1.NotFoundError("There is no comment on post currently!");
    }
    return post.comments;
});
exports.fetchAllCommentsOnPost = fetchAllCommentsOnPost;
