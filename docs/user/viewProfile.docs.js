module.exports = {
  get: {
    tags: ["User"],
    summary: "view profile",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: {
                  _id: "648174ae2926ad550d3312c7",
                  username: "jenil.bhalala",
                  email: "jenil12@gmail.com",
                  age: 19,
                  createdAt: "2023-06-08T06:26:54.292Z",
                  updatedAt: "2023-06-08T06:26:54.577Z",
                  __v: 1,
                },
              },
            },
          },
        },
      },
    },
  },
};
