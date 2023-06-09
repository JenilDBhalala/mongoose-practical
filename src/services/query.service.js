const User = require("../models/users.model");
const Post = require("../models/posts.model");
const mongoose = require("mongoose");
const { NotFoundError } = require("../error");

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
  findLatestComments,
  searchByUsername,
  countOfPosts,
};