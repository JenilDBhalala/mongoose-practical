const { connectToDB, disconnectDB } = require("../../config/db");
const userService = require("../services/user.service");
const User = require("../models/users.model");

beforeAll(async () => {
  await connectToDB();
  await User.deleteMany({});
});

describe("User Services", () => {
  let user, token;
  test("Should sign up", async () => {
    const data = {
      username: "jenil.bhalala",
      email: "jenil89@gmail.com",
      password: "jenil123",
      age: "19",
    };

    const result = await userService.createProfile(data);

    expect(result).toEqual({
      user: expect.objectContaining({
        username: "jenil.bhalala",
        email: "jenil89@gmail.com",
        age: 19,
      }),
      token: expect.any(String),
    });

    user = result.user;
    token = result.token;
  });

  test("Should not sign up with duplicate email", async () => {
    const data = {
      username: "jenil.bhalala",
      email: "jenil89@gmail.com",
      password: "jenil123",
      age: "19",
    };

    try {
      await userService.createProfile(data);
    } catch (error) {
      expect(error.message).toMatch("E11000 duplicate key error collection");
    }
  });

  test("Should update profile", async () => {
    const data = {
      username: "jenil123",
      age: 21,
    };

    const result = await userService.updateProfile(data, user);

    expect(result).toEqual(
      expect.objectContaining({
        username: "jenil123",
        email: "jenil89@gmail.com",
        age: 21,
      })
    );
  });

  test("Should not update profile with invalid update", async () => {
    const data = {
      email: "jenil12@gmail.com",
    };

    try {
      const result = await userService.updateProfile(data, user);
    } catch (error) {
      expect(error.message).toEqual("Invalid Update");
    }
  });

  test("Should logout", async () => {
    const result = await userService.logoutUser(user, token);

    expect(result).toEqual(
      expect.objectContaining({
        username: "jenil123",
        email: "jenil89@gmail.com",
        age: 21,
      })
    );
  });

  test("Should sign in", async () => {
    const data = {
      email: "jenil89@gmail.com",
      password: "jenil123",
    };

    const result = await userService.loginUser(data.email, data.password);

    expect(result).toEqual({
      user: expect.objectContaining({
        username: "jenil123",
        email: "jenil89@gmail.com",
        age: 21,
      }),
      token: expect.any(String),
    });
  });

  test("Should not sign in with wrong credentials", async () => {
    const data = {
      email: "jenil89@gmail.com",
      password: "jenil12",
    };

    try {
      await userService.loginUser(data.email, data.password);
    } catch (error) {
      expect(error.message).toEqual("Invalid Credentials");
    }
  });

  test("Should delete profile", async () => {
    const result = await userService.deleteProfile(user);

    expect(result).toEqual(
      expect.objectContaining({
        username: "jenil123",
        email: "jenil89@gmail.com",
        age: 21,
      })
    );
  });
});

afterAll(async () => {
  await disconnectDB();
});
