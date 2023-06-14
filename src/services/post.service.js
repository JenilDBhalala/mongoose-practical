const Post = require('../models/posts.model')
const { NotFoundError } = require('../error')

/**
 * Fetches all posts created by a user.
 * @param {Object} user - The user object.
 * @returns {Promise<Array>} An array of posts.
 * @throws {NotFoundError} If no posts are found.
 */
const fetchAllPosts = async (user) => {
    const posts = await Post.find({ postedBy: user._id });

    if (posts.length === 0)
        throw new NotFoundError('posts not found!');

    return posts;
}


/**
 * Fetches a post by ID that was created by a user.
 * @param {Object} user - The user object.
 * @param {Object} params - The request params.
 * @returns {Promise<Object>} The post object.
 * @throws {NotFoundError} If the post is not found.
 */
const fetchPostById = async (user, id) => {
  const post = await Post.findOne({ postedBy: user._id, _id: id });

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
const updatePost = async (body, id) => {
  const post = await Post.findByIdAndUpdate(id, body, { new: true });

  if (!post) {
    throw new NotFoundError("post not found!");
  }

  console.log(post);
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
  const post = await Post.findOne({ postedBy: user._id, _id: params.id });

  if (!post) throw new NotFoundError("post not found!");

  post.deleteOne();
};

/**
 * Adds a comment to a post by ID.
 * @param {Object} params - The request parameters.
 * @param {Object} body - The request body.
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The updated post object.
 * @throws {NotFoundError} If the post is not found.
 */
const addComment = async (id, body, user) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new NotFoundError("post not found!");
  }

  post.comments.push({ comment: body.comment, commentBy: user._id });

  return post.save();
};


/**
 * Fetches all comments on a post by ID.
 * @param {Object} params - The request parameters.
 * @returns {Promise<Array>} An array of comment objects.
 * @throws {NotFoundError} If there are no comments on the post.
 */
const fetchAllCommentsOnPost = async (id) => {
  const { comments } = await Post.findById(id).populate("comments.commentBy", {
    _id: 0,
    username: 1,
  });

  if (comments.length === 0) {
    throw new NotFoundError("There is no comment on post currently!");
  }
  return comments;
};

module.exports = {
    addPost,
    updatePost,
    fetchAllPosts,
    fetchPostById,
    deletePost,
    addComment,
    fetchAllCommentsOnPost
}