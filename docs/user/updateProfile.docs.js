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
                  _id: "6482c014fc015ca25f03d9eb",
                  username: "jenilbhalala",
                  email: "jenil12@gmail.com",
                  age: 21,
                  createdAt: "2023-06-09T06:00:52.902Z",
                  updatedAt: "2023-06-09T06:02:49.612Z",
                  __v: 2,
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
