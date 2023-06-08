module.exports = {
  get: {
    tags: ["Post"],
    summary: "fetch all posts",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: [
                  {
                    _id: "643e7d21e07ceff7681617de",
                    caption:
                      "Enjoying the view at the beach #beachlife #sunset #vacation",
                    location: "Maldives",
                    tags: ["beachlife", "sunset", "vacation"],
                    postedBy: "643f92e8307bfa28ce132c62",
                    comments: [
                      {
                        comment: "Wow, beautiful!",
                        commentBy: "643f9252307bfa28ce132c4d",
                        commentDate: "2023-04-18T11:43:31.998Z",
                        _id: "643e7d6ae07ceff7681617e7",
                      },
                      {
                        comment: "what a place!!",
                        commentBy: "644112775007dbd4b39007ae",
                        commentDate: "2023-04-20T10:52:50.691Z",
                        _id: "64411994ad48b43838fcdaf7",
                      },
                    ],
                    createdAt: "2023-04-18T11:38:38.211Z",
                    updatedAt: "2023-04-20T10:53:08.146Z",
                    __v: 8,
                  },
                  {
                    _id: "6441365f379a6130e44f59d0",
                    caption: "this is new post!",
                    location: "nadiad",
                    tags: ["ddu", "nadiad", "collegeroad"],
                    postedBy: "643f92e8307bfa28ce132c62",
                    comments: [],
                    createdAt: "2023-04-20T12:55:59.144Z",
                    updatedAt: "2023-04-20T12:55:59.144Z",
                    __v: 0,
                  },
                ],
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
                error: "posts not found!",
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
