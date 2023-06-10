"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./config/db");
//importing routes
const routes_1 = require("./routes");
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use("/users", routes_1.userRoutes);
app.use("/posts", routes_1.postRoutes);
app.use("/queries", routes_1.queryRoutes);
//error handler middlewares
app.use((error, req, res, next) => {
    res.status(error.status || 400).json({ error: error.message });
});
//server configuration
console.log("hello2");
db_1.connectToDB();
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`);
});
