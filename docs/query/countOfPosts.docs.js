module.exports = {
  get: {
    tags: ["Query"],
    summary: "count posts by hashtags",
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
                    _id: "explorepage",
                    count: 1,
                  },
                  {
                    _id: "paris",
                    count: 1,
                  },
                  {
                    _id: "collegelife",
                    count: 1,
                  },
                  {
                    _id: "nature",
                    count: 1,
                  },
                ],
              },
            },
          },
        },
      },
      404: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                error: "No posts found!",
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
