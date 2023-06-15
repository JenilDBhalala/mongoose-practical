const request = require("supertest");
const app = require("./app");
const { connectToDB, disconnectDB } = require("./config/db");
const User = require("./src/models/users.model");

beforeAll(async () => {
  await connectToDB();
  await User.deleteMany({});
}, 10000);

describe("User handlers", () => {
  let token;

  test("Should sign up a new user", async () => {
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
        token = response.body.data.token;
      });
  });

  test("Should create duplicate user", async () => {
    await request(app)
      .post("/users/auth/signup")
      .send({
        username: "jenil.bhalala",
        email: "jenil89@gmail.com",
        password: "jenil123",
        age: "19",
      })
      .expect(400);
  });

  test("Should fetch user profile", async () => {
    await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("Should update user profile", async () => {
    await request(app)
      .patch("/users/me")
      .send({
        username: "jenil123",
        age: "21",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("Should logout user", async () => {
    await request(app)
      .post("/users/auth/logout")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("Should sign in a user", async () => {
    await request(app)
      .post("/users/auth/login")
      .send({
        email: "jenil89@gmail.com",
        password: "jenil123",
      })
      .expect(200)
      .then((response) => {
        token = response.body.data.token;
      });
  });

  test("Should delete user profile", async () => {
    await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

afterAll(async () => {
  await disconnectDB();
});
