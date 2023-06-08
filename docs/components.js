module.exports = {
  // Define the security scheme type (HTTP bearer)
  components: {
    securitySchemes: {
      bearerAuth: {
        // arbitrary name for the security scheme
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      createProfile: {
        type: "object",
        properties: {
          username: { type: "string", example: "jenil.bhalala" },
          email: { type: "string", example: "jenil12@gmail.com" },
          password: { type: "string", example: "jenil123" },
          age: { type: "string", example: 19 },
        },
      },
      loginUser: {
        type: "object",
        properties: {
          email: { type: "string", example: "jenil12@gmail.com" },
          password: { type: "string", example: "jenil123" },
        },
      },
      updateProfile: {
        type: "object",
        properties: {
          username: { type: "string", example: "jenilbhalala" },
          password: { type: "string", example: "jenil12" },
          age: { type: "string", example: 21 },
        },
      },
      addPost: {
        type: "object",
        properties: {
          caption: { type: "string", example: "this is new post!" },
          location: { type: "string", example: "nadiad" },
          tags: { type: "list", example: ["ddu", "nadiad", "collegeroad"] },
        },
      },
      updatePost: {
        type: "object",
        properties: {
          caption: { type: "string", example: "this is updated post!" },
          location: { type: "string", example: "ahmedabad" },
          tags: {
            type: "list",
            example: ["simform", "ahmedabad"],
          },
        },
      },
      addCommentOnPost: {
        type: "object",
        properties: {
          comment: { type: "string", example: "nice post" },
        },
      },
    },
  },
};
