const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

//importing routes
const userRoutes = require("./src/routes/user.route");
const postRoutes = require("./src/routes/post.route");

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 400).json({ error: error.message });
});

module.exports = app;
