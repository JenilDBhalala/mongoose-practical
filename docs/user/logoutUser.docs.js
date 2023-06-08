module.exports = {
  post: {
    tags: ["User"],
    summary: "logout user",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "user logged out successfully",
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                error: "Please Authenticate!",
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
                message: "invalid signature",
              },
            },
          },
        },
      },
    },
  },
};
