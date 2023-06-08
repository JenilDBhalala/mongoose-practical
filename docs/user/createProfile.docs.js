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
                user: {
                  username: "jenil.bhalala",
                  email: "jenil12@gmail.com",
                  age: 19,
                  _id: "648174ae2926ad550d3312c7",
                  createdAt: "2023-06-08T06:26:54.292Z",
                  updatedAt: "2023-06-08T06:26:54.577Z",
                  __v: 1,
                },
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODE3NGFlMjkyNmFkNTUwZDMzMTJjNyIsImlhdCI6MTY4NjIwNTYxNH0.bwYvBjHXXETOkCmQX-Xgs13bYsD5INw2tyhrB_GzmIQ",
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
