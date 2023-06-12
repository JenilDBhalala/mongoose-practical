const request = require("supertest");
const app = require("../../app");
const User = require("../models/users.model");

beforeEach(async () => {
  await User.deleteMany({});
});

describe("User handlers", () => {
  test("Should sign up for a user", async () => {
    await request(app)
      .post("/users/auth/signup")
      .send({
        username: "jenil.bhalala",
        email: "jenil89@gmail.com",
        password: "jenil123",
        age: "19",
      })
      .expect(201)
      .then((response) => {
        console.log(response.body);
      });
  });
});
