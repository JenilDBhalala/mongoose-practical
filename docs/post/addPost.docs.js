module.exports = {
  post: {
    tags: ["Post"],
    summary: "add post",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/addPost",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Post added successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: {
                  caption: "this is new post!",
                  location: "nadiad",
                  tags: ["ddu", "nadiad", "collegeroad"],
                  postedBy: "643f92e8307bfa28ce132c62",
                  _id: "64816a66790bfe36a04ad2fd",
                  comments: [],
                  createdAt: "2023-06-08T05:43:02.611Z",
                  updatedAt: "2023-06-08T05:43:02.611Z",
                  __v: 0,
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
