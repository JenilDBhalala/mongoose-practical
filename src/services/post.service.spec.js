const { connectToDB, disconnectDB } = require("../../config/db");
const postService = require("../services/post.service");
const userService = require("../services/user.service");
const Post = require("../models/posts.model");
const User = require("../models/users.model");

beforeAll(async () => {
  await connectToDB();
  await Post.deleteMany({});
  await User.deleteMany({});
});

describe("Post Services", () => {
  let user;
  const posts = [];

  test("Should sign up", async () => {
    const data = {
      username: "jenil.bhalala",
      email: "jenil89@gmail.com",
      password: "jenil123",
      age: "19",
    };

    const result = await userService.createProfile(data);

    expect(result).toEqual({
      user: expect.objectContaining({
        username: "jenil.bhalala",
        email: "jenil89@gmail.com",
        age: 19,
      }),
      token: expect.any(String),
    });

    user = result.user;
    token = result.token;
  });

  //   test("Should create post", async () => {
  //     const data = {
  //       caption: "this is latest post!",
  //       location: "ahmedabad",
  //     };

  //     const result = await postService.addPost(data, user);

  //     expect(result).toEqual(
  //       expect.objectContaining({
  //         caption: "this is latest post!",
  //         location: "ahmedabad",
  //         tags: expect.any(Array),
  //         postedBy: user._id,
  //         comments: expect.any(Array),
  //       })
  //     );

  //     post = result;
  //   });

  test("Should create multiple posts", async () => {
    const postData = [
      {
        caption: "post 1",
        location: "location 1",
      },
      {
        caption: "post 2",
        location: "location 2",
      },
      {
        caption: "post 3",
        location: "location 3",
      },
    ];

    for (const data of postData) {
      const result = await postService.addPost(data, user);

      expect(result).toEqual(
        expect.objectContaining({
          caption: data.caption,
          location: data.location,
          tags: [],
          postedBy: user._id,
          comments: [],
        })
      );

      posts.push(result);
    }
  });

  test("Should view post by id", async () => {
    const result = await postService.fetchPostById(user, posts[1]._id);

    expect(result).toEqual(
      expect.objectContaining({
        caption: posts[1].caption,
        location: posts[1].location,
        tags: [],
        postedBy: user._id,
        comments: [],
      })
    );
  });

  test("Should display post not found message with id not exists", async () => {
    try {
      await postService.fetchPostById(user, "123456789012");
    } catch (error) {
      expect(error.message).toEqual("post not found!");
    }
  });

  test("Should view all posts", async () => {
    const result = await postService.fetchAllPosts(user);

    expect(result).toEqual(
      expect.arrayContaining(
        posts.map((post) => {
          return expect.objectContaining({
            caption: post.caption,
            location: post.location,
            tags: [],
            postedBy: user._id,
            comments: [],
          });
        })
      )
    );
  });

  test("Should update post by id", async () => {
    const data = {
      tags: ["holiday", "trip"],
    };
    const result = await postService.updatePost(data, posts[1]._id);

    expect(result).toEqual(
      expect.objectContaining({
        caption: posts[1].caption,
        location: posts[1].location,
        tags: data.tags,
        postedBy: user._id,
        comments: [],
      })
    );

    posts[1] = result;
  });

  test("Should not update post with id not exists", async () => {
    const data = {
      tags: ["holiday", "trip"],
    };
    try {
      await postService.updatePost(data, "123456789012");
    } catch (error) {
      expect(error.message).toEqual("post not found!");
    }
  });

  test("Should do multiple comments on post", async () => {
    const comments = [
      {
        comment: "this is good post",
      },
      {
        comment: "this is nice way",
      },
      {
        comment: "this is nice idea",
      },
    ];

    let result;
    for (const data of comments) {
      result = await postService.addComment(posts[1]._id, data, user);
    }

    expect(result).toEqual(
      expect.objectContaining({
        caption: posts[1].caption,
        location: posts[1].location,
        tags: posts[1].tags,
        postedBy: user._id,
        comments: comments.map((data) => {
          return expect.objectContaining({
            comment: data.comment,
            commentBy: user._id,
          });
        }),
      })
    );

    posts[1] = result;
  });

  test("Should view all comments on post", async () => {
    const result = await postService.fetchAllCommentsOnPost(posts[1]._id);
    expect(result).toEqual(
      posts[1].comments.map((data) => {
        return expect.objectContaining({
          comment: data.comment,
          commentBy: expect.objectContaining({
            username: user.username,
          }),
        });
      })
    );
  });

  test("Should display there is no comment on post", async () => {
    try {
      await postService.fetchAllCommentsOnPost(posts[0]._id);
    } catch (error) {
      expect(error.message).toEqual("There is no comment on post currently!");
    }
  });

  test("Should view 2 latest comments on post", async () => {
    const query = { skip: 0, limit: 2 };

    const comments = await postService.findLatestComments(posts[1]._id, query);

    expect(comments).toHaveLength(2);
  });
});

afterAll(async () => {
  await disconnectDB();
});
