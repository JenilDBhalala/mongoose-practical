module.exports = {
  get: {
    tags: ["Query"],
    summary: "find latest comments on post by id",
    parameters: [
      {
        name: "postId",
        in: "path",
        required: true,
        description: "id of post on which you want to find latest comments",
        type: "string",
      },
      {
        name: "skip",
        in: "query",
        required: true,
        description: "Enter skip query parameter for skipping comments",
        type: "string",
      },
      {
        name: "limit",
        in: "query",
        required: true,
        description: "Enter limit query parameter for limitting comments",
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Successful Response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: [
                  {
                    comments: {
                      comment: "nice view!!",
                      commentBy: [
                        {
                          username: "chirag",
                        },
                      ],
                      commentDate: "2023-04-19T08:52:23.959Z",
                    },
                  },
                  {
                    comments: {
                      comment: "beautiful place!!",
                      commentBy: [
                        {
                          username: "divy",
                        },
                      ],
                      commentDate: "2023-04-19T08:52:23.959Z",
                    },
                  },
                ],
              },
            },
          },
        },
      },
      400: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                error: "There is no comments on post!",
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
