const findLatestCommentsDoc = require("./findLatestComments.docs");
const searchByUsernameDoc = require("./searchByUsername.docs");
const countOfPostsDoc = require("./countOfPosts.docs");

module.exports = {
  "/queries/posts/{postId}/comment": {
    ...findLatestCommentsDoc,
  },
  "/queries/posts": {
    ...countOfPostsDoc,
  },
  "/queries/users": {
    ...searchByUsernameDoc,
  },
};
