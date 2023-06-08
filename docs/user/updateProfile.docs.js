module.exports = {
  patch: {
    tags: ["User"],
    summary: "update profile",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/updateProfile",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successfully updated profile",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/createProfile",
            },
            schema: {
              type: "object",
              example: {
                data: {
                  _id: "648174ae2926ad550d3312c7",
                  username: "jenilbhalala",
                  email: "jenil12@gmail.com",
                  age: 22,
                  createdAt: "2023-06-08T06:26:54.292Z",
                  updatedAt: "2023-06-08T06:37:07.154Z",
                  __v: 1,
                },
              },
            },
          },
        },
      },
      400: {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                error: "Invalid Update",
              },
            },
          },
        },
      },
    },
  },
};
