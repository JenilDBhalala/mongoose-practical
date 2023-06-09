const express = require('express');
const morgan = require('morgan')
require('dotenv').config();
require('./config/db')

//importing routes
const userRoutes = require('./src/routes/user.route')
const postRoutes = require('./src/routes/post.route')
const queryRoutes = require('./src/routes/query.route')

const app = express();
app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({extended : false}))

//routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/queries', queryRoutes);

//error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 400).json({ error: error.message });
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//server configuration
const host = process.env.HOST;
const port = process.env.PORT || 3002;

app.listen(port, host, () => {
  console.log(`app is listening on http://localhost:${port}`);
});