const fetchAllPostsDoc = require("./fetchAllPosts.docs");
const fetchPostByIdDoc = require("./fetchPostById.docs");
const addPostDoc = require("./addPost.docs");
const updatePostDoc = require("./updatePost.docs");
const deletePostDoc = require("./deletePost.docs");

module.exports = {
  "/posts": {
    ...addPostDoc,
    ...fetchAllPostsDoc,
  },
  "/posts/{postId}": {
    ...fetchPostByIdDoc,
    ...updatePostDoc,
    ...deletePostDoc,
  },
};
