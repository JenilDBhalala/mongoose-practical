module.exports = {
  post: {
    tags: ["User"],
    summary: "login user",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/loginUser",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successfully LoggedIn",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: {
                  user: {
                    _id: "6482c014fc015ca25f03d9eb",
                    username: "jenil.bhalala",
                    email: "jenil12@gmail.com",
                    age: 19,
                    createdAt: "2023-06-09T06:00:52.902Z",
                    updatedAt: "2023-06-09T06:01:09.951Z",
                    __v: 2,
                  },
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODJjMDE0ZmMwMTVjYTI1ZjAzZDllYiIsImlhdCI6MTY4NjI5MDQ2OX0.sYq2Zd_Bun-Wni-aRy7h8AAPsnjvZzJTJCYwCNY7t-w",
                },
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
                error: "Invalid Credentials",
              },
            },
          },
        },
      },
    },
  },
};
