module.exports = {
  delete: {
    tags: ["User"],
    summary: "delete profile",
    responses: {
      200: {
        description: "successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "user deleted successfully",
              },
            },
          },
        },
      },
    },
  },
};
