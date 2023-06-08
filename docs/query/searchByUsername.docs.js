module.exports = {
  get: {
    tags: ["Query"],
    summary: "search by username",
    parameters: [
      {
        name: "search",
        in: "query",
        required: true,
        description: "Enter search query parameter for search user by username",
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
                    _id: "643e6ea4e07ceff7681617a1",
                    username: "jenil",
                    email: "jenil123@gmail.com",
                    age: 22,
                  },
                  {
                    _id: "648174ae2926ad550d3312c7",
                    username: "jenilbhalala",
                    email: "jenil12@gmail.com",
                    age: 22,
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
              properties: {
                error: {
                  type: "string",
                },
              },
              example: {
                error: "No users found!",
              },
            },
          },
        },
      },
    },
  },
};
