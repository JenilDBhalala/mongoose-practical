const mongoose = require("mongoose");
const { NotFoundError } = require("../error");
const Post = require("../models/posts.model");

/**
 * Fetches all posts created by a user.
 * @param {Object} user - The user object.
 * @returns {Promise<Array>} An array of posts.
 * @throws {NotFoundError} If no posts are found.
 */
const fetchAllPosts = async (user) => {
  const posts = await Post.find({ postedBy: user._id });

  if (posts.length === 0) throw new NotFoundError("posts not found!");

  return posts;
};

/**
 * Fetches a post by ID that was created by a user.
 * @param {Object} user - The user object.
 * @param {Object} params - The request params.
 * @returns {Promise<Object>} The post object.
 * @throws {NotFoundError} If the post is not found.
 */
const fetchPostById = async (user, params) => {
  const post = await Post.findOne({ postedBy: user._id, _id: params.id });

  if (!post) throw new NotFoundError("post not found!");

  return post;
};

/**
 * Creates a new post.
 * @param {Object} body - The request body.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The post object.
 */
const addPost = async (body, user) => {
  const post = await Post.create({
    ...body,
    postedBy: user._id,
  });
  return post;
};

/**
 * Updates a post by ID.
 * @param {Object} body - The request body.
 * @param {Object} params - The request parameters.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the post is not found.
 */
const updatePost = async (body, params) => {
  const post = await Post.findByIdAndUpdate(
    params.id,
    { ...body },
    {
      new: true,
    }
  );
  if (!post) {
    throw new NotFoundError("post not found!");
  }
  return post;
};

/**
 * Deletes a post by ID.
 * @param {Object} user - The user object.
 * @param {Object} params - The request parameters.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the post is not found.
 */
const deletePost = async (user, params) => {
  const post = await Post.findOneAndDelete({
    postedBy: user._id,
    _id: params.id,
  });

  if (!post) throw new NotFoundError("post not found!");

  return post;
};

/**
 * Adds a comment to a post by ID.
 * @param {Object} params - The request parameters.
 * @param {Object} body - The request body.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The updated post object.
 * @throws {NotFoundError} If the post is not found.
 */
const addComment = async (params, body, user) => {
  const post = await Post.findById(params.id);

  if (!post) {
    throw new NotFoundError("post not found!");
  }

  post.comments.push({ comment: body.comment, commentBy: user._id });
  await post.save();

  return post;
};

/**
 * Fetches all comments on a post by ID.
 * @param {Object} params - The request parameters.
 * @returns {Promise<Array>} An array of comment objects.
 * @throws {NotFoundError} If there are no comments on the post.
 */
const fetchAllCommentsOnPost = async (params) => {
  const { comments } = await Post.findById(params.id).populate(
    "comments.commentBy",
    { _id: 0, username: 1 }
  );

  if (comments.length === 0) {
    throw new NotFoundError("There is no comment on post currently!");
  }
  return comments;
};

/**
 * Finds latest comments on a post using aggregate pipeline
 * @param {Object} params - The object containing the ID of the post.
 * @param {Object} query - The object containing the pagination parameters (skip and limit).
 * @returns {Promise<Array>} - A promise that resolves to an array of comments.
 * @throws {NotFoundError} - If there are no comments on the post.
 */
const findLatestComments = async (params, query) => {
  const comments = await Post.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(params.id) },
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
      $skip: isNaN(+query.skip) ? 0 : +query.skip,
    },
    {
      $limit: isNaN(+query.limit) ? 5 : +query.limit,
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
    throw new NotFoundError("There is no comments on post!");
  }

  return comments;
};

/**
 * Counts the number of posts based on their tags
 * @returns {Promise<Array>} Array of objects containing tag and count of posts for each tag
 * @throws {NotFoundError} If no posts are found
 */
const countOfPosts = async () => {
  const posts = await Post.aggregate([
    {
      $unwind: "$tags",
    },
    {
      $group: { _id: "$tags", count: { $sum: 1 } },
    },
  ]);
  if (posts.length === 0) {
    throw new NotFoundError("No posts found!");
  }
  return posts;
};

module.exports = {
  addPost,
  updatePost,
  fetchAllPosts,
  fetchPostById,
  deletePost,
  addComment,
  fetchAllCommentsOnPost,
  findLatestComments,
  countOfPosts,
};
