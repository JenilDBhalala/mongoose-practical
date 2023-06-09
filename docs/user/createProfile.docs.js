module.exports = {
  post: {
    tags: ["User"],
    summary: "create profile",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/createProfile",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Successfully Created Profile",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: {
                  user: {
                    username: "jenil.bhalala",
                    email: "jenil12@gmail.com",
                    age: 19,
                    _id: "6482c014fc015ca25f03d9eb",
                    createdAt: "2023-06-09T06:00:52.902Z",
                    updatedAt: "2023-06-09T06:00:53.185Z",
                    __v: 1,
                  },
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODJjMDE0ZmMwMTVjYTI1ZjAzZDllYiIsImlhdCI6MTY4NjI5MDQ1M30.wXtxybR1Mw3oUuNPWJWkYLxhBGpniazLoAfuOOTG6z0",
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
                message:
                  'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "jenil12@gmail.com" }',
              },
            },
          },
        },
      },
    },
  },
};
