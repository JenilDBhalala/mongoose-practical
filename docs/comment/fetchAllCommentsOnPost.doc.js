module.exports = {
  get: {
    tags: ["Comment"],
    summary: "fetch all comments on specific post",
    parameters: [
      {
        name: "postId",
        in: "path",
        required: true,
        description: "id of post on which you want to find comments",
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: [
                  {
                    comment: "hello!!",
                    commentBy: {
                      username: "jenilbhalala",
                    },
                    commentDate: "2023-06-08T07:42:55.097Z",
                    _id: "648186a73028b0de11930fe0",
                  },
                ],
              },
            },
          },
        },
      },
      404: {
        description: "Not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                error: "There is no comment on post currently!",
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
