module.exports = {
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "id of post that we want to update",
      type: "integer",
    },
  ],
  patch: {
    tags: ["Post"],
    summary: "update post",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              caption: "this is new post!",
              location: "nadiad",
              tags: ["ddu", "nadiad", "collegeroad"],
            },
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
                message: "post updated successfully!",
              },
            },
          },
        },
      },
      500: {
        description: "Jwt not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "jwt malformed",
              },
            },
          },
        },
      },
    },
  },
};
