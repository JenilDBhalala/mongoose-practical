import express, { Request, Response, NextFunction } from "express"
import morgan from "morgan";
import dotenv from "dotenv"
dotenv.config()
import {connectToDB} from "./config/db";

//importing routes
import { userRoutes, postRoutes, queryRoutes } from "./routes";

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/queries", queryRoutes);

//error handler middlewares
app.use((error: Error & {status? : number}, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 400).json({ error: error.message });
});

//server configuration

console.log("hello2")
connectToDB()
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
