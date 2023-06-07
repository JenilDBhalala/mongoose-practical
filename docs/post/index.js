const fetchAllPostsDoc = require("./fetchAllPosts.docs");
const updatePostDoc = require("./updatePost.docs");

module.exports = {
  "/posts": {
    ...fetchAllPostsDoc,
  },
  "/posts/:id": {},
  "/posts": {},
  "/posts/{id}": {
    ...updatePostDoc,
  },
  "/posts/:id": {},
};
