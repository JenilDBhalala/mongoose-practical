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
                        comment: "This is breathtaking!",
                        commentBy: "643e6ea4e07ceff7681617a1",
                        commentDate: "2023-04-18T11:45:09.122Z",
                        _id: "643e7d8ee07ceff7681617ec",
                      },
                      {
                        comment: "why have you change your pc!",
                        commentBy: "643e6efce07ceff7681617ad",
                        commentDate: "2023-04-19T08:52:23.959Z",
                        _id: "643fb3501e6db702bbea09e8",
                      },
                      {
                        comment: "nice view!!",
                        commentBy: "643f9252307bfa28ce132c4d",
                        commentDate: "2023-04-19T08:52:23.959Z",
                        _id: "643fb3a31e6db702bbea09f5",
                      },
                      {
                        comment: "looking cool!!!!",
                        commentBy: "643f92ff307bfa28ce132c66",
                        commentDate: "2023-04-19T08:52:23.959Z",
                        _id: "643fb3e01e6db702bbea0a03",
                      },
                      {
                        comment: "beautiful place!!",
                        commentBy: "643f9263307bfa28ce132c51",
                        commentDate: "2023-04-19T08:52:23.959Z",
                        _id: "643fb4271e6db702bbea0a12",
                      },
                      {
                        comment: "what a place!!",
                        commentBy: "643f9275307bfa28ce132c55",
                        commentDate: "2023-04-19T08:52:23.959Z",
                        _id: "643fb4981e6db702bbea0a24",
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
    },
  },
};
