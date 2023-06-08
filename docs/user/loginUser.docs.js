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
                user: {
                  _id: "648174ae2926ad550d3312c7",
                  username: "jenilbhalala",
                  email: "jenil12@gmail.com",
                  age: 22,
                  createdAt: "2023-06-08T06:26:54.292Z",
                  updatedAt: "2023-06-08T06:40:25.049Z",
                  __v: 2,
                },
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODE3NGFlMjkyNmFkNTUwZDMzMTJjNyIsImlhdCI6MTY4NjIwNjQyNX0.WrJdVb2S9ZMvolIfPNYUi5zAEdXelZyJx6xsVWBSk-k",
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
