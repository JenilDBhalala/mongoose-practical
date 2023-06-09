const morgan = require("morgan");
require("dotenv").config();
require("./config/db");
import { Request, Response, NextFunction } from "express";

//importing routes
const userRoutes = require("./src/routes/user.route");
const postRoutes = require("./src/routes/post.route");
const queryRoutes = require("./src/routes/query.route");

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/queries", queryRoutes);

// //error handler middleware
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(error.status || 400).json({ error: error.message });
// });

//server configuration
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
