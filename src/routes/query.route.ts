import express from "express";
import * as queryController from "../controllers/query.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get("/posts/:id/comment", auth, queryController.findLatestComments);
router.get("/users/", queryController.searchByUsername);
router.get("/posts/", queryController.countOfPosts);

export default router;