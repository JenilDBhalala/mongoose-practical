module.exports = {
  patch: {
    tags: ["Post"],
    summary: "update post",
    parameters: [
      {
        name: "postId",
        in: "path",
        required: true,
        description: "id of post that we want to update",
        type: "integer",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/updatePost",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successful Response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "post updated successfully",
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
                error: "posts with this id not found!",
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
