const addCommentDoc = require("./addComment.doc");
const fetchAllCommentsOnPostDoc = require("./fetchAllCommentsOnPost.doc");

module.exports = {
  "/posts/{postId}/comment": {
    ...addCommentDoc,
    ...fetchAllCommentsOnPostDoc,
  },
};
