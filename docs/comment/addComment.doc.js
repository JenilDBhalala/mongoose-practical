module.exports = {
  patch: {
    tags: ["Comment"],
    summary: "add comment on post",
    parameters: [
      {
        name: "postId",
        in: "path",
        required: true,
        description: "id of post on which you want to add comment",
        type: "string",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/addCommentOnPost",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: {
                  _id: "6481868b3028b0de11930fdb",
                  caption: "this is new post!",
                  location: "nadiad",
                  tags: ["ddu", "nadiad", "collegeroad"],
                  postedBy: "648174ae2926ad550d3312c7",
                  comments: [
                    {
                      comment: "hello!!",
                      commentBy: "648174ae2926ad550d3312c7",
                      commentDate: "2023-06-08T07:42:55.097Z",
                      _id: "648186a73028b0de11930fe0",
                    },
                  ],
                  createdAt: "2023-06-08T07:43:07.279Z",
                  updatedAt: "2023-06-08T07:43:35.168Z",
                  __v: 1,
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "Invalid signature",
              },
            },
          },
        },
      },
    },
  },
};
