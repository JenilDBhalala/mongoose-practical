import { IComment, IPost, Post } from "../models/posts.model";
import { IUser } from "../models/users.model";
import { NotFoundError } from "../error";

/**
 * Fetches all posts created by a user.
 * @param {Object} user - The user object.
 * @returns {Promise<Array>} An array of posts.
 * @throws {NotFoundError} If no posts are found.
 */
export const fetchAllPosts = async (user: IUser) => {
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
export const fetchPostById = async (user: IUser, id: string) => {
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
export const addPost = async (body: IPost, user : IUser) => {
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
export const updatePost = async (body : IPost, id : string) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new NotFoundError("post not found!");
  }
  await post.updateOne(
    {
      ...body,
    },
    { runValidators: true }
  );
};

/**
 * Deletes a post by ID.
 * @param {Object} user - The user object.
 * @param {Object} params - The request parameters.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the post is not found.
 */
export const deletePost = async (user : IUser, id : string) => {
  const post = await Post.findOne({ postedBy: user._id, _id: id });

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
export const addComment = async (id : string, body : IComment, user : IUser) => {
  const post = await Post.findById(id);

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
export const fetchAllCommentsOnPost = async (id : string) => {
  const post = await Post.findById(id).populate(
    "comments.commentBy",
    { _id: 0, username: 1 }
  );

  if (!post || post.comments.length === 0) {
    throw new NotFoundError("There is no comment on post currently!");
  }
  return post.comments;
};

