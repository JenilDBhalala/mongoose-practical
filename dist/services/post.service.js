var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Post } from "../models";
import { NotFoundError } from "../error";
/**
 * Fetches all posts created by a user.
 * @param {Object} user - The user object.
 * @returns {Promise<Array>} An array of posts.
 * @throws {NotFoundError} If no posts are found.
 */
const fetchAllPosts = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post.find({ postedBy: user._id });
    if (posts.length === 0)
        throw new NotFoundError("posts not found!");
    return posts;
});
/**
 * Fetches a post by ID that was created by a user.
 * @param {Object} user - The user object.
 * @param {Object} params - The request params.
 * @returns {Promise<Object>} The post object.
 * @throws {NotFoundError} If the post is not found.
 */
const fetchPostById = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findOne({ postedBy: user._id, _id: id });
    if (!post)
        throw new NotFoundError("post not found!");
    return post;
});
/**
 * Creates a new post.
 * @param {Object} body - The request body.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The post object.
 */
const addPost = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.create(Object.assign(Object.assign({}, body), { postedBy: user._id }));
    return post;
});
/**
 * Updates a post by ID.
 * @param {Object} body - The request body.
 * @param {Object} params - The request parameters.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the post is not found.
 */
const updatePost = (body, params) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById(params.id);
    if (!post) {
        throw new NotFoundError("post not found!");
    }
    yield post.updateOne(Object.assign({}, body), { runValidators: true });
});
/**
 * Deletes a post by ID.
 * @param {Object} user - The user object.
 * @param {Object} params - The request parameters.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the post is not found.
 */
const deletePost = (user, params) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findOne({ postedBy: user._id, _id: params.id });
    if (!post)
        throw new NotFoundError("post not found!");
    post.deleteOne();
});
/**
 * Adds a comment to a post by ID.
 * @param {Object} params - The request parameters.
 * @param {Object} body - The request body.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The updated post object.
 * @throws {NotFoundError} If the post is not found.
 */
const addComment = (params, body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById(params.id);
    if (!post) {
        throw new NotFoundError("post not found!");
    }
    post.comments.push({ comment: body.comment, commentBy: user._id });
    yield post.save();
    return post;
});
/**
 * Fetches all comments on a post by ID.
 * @param {Object} params - The request parameters.
 * @returns {Promise<Array>} An array of comment objects.
 * @throws {NotFoundError} If there are no comments on the post.
 */
const fetchAllCommentsOnPost = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { comments } = yield Post.findById(params.id).populate("comments.commentBy", { _id: 0, username: 1 });
    if (comments.length === 0) {
        throw new NotFoundError("There is no comment on post currently!");
    }
    return comments;
});
module.exports = {
    addPost,
    updatePost,
    fetchAllPosts,
    fetchPostById,
    deletePost,
    addComment,
    fetchAllCommentsOnPost,
};
