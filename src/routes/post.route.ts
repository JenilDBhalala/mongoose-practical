import express from "express";
import * as postController from "../controllers/post.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, postController.fetchAllPosts);

router.get("/:id", auth, postController.fetchPostById);

router.post("/", auth, postController.addPost);

router.patch("/:id", auth, postController.updatePost);

router.delete("/:id", auth, postController.deletePost);

//routes related to comments
router.patch("/:id/comment", auth, postController.addComment);

router.get("/:id/comment", auth, postController.fetchAllCommentsOnPost);

export default router;