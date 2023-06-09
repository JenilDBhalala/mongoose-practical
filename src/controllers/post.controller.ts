import { NextFunction, Request, Response } from "express";

const postService = require("../services/post.service");

const fetchAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await postService.fetchAllPosts(req.user);
    res.status(200).json({ data: posts });
  } catch (err) {
    next(err);
  }
};

const fetchPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await postService.fetchPostById(req.user, req.params.id);
    res.status(200).json({ data: post });
  } catch (err) {
    next(err);
  }
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.addPost(req.body, req.user);
    res.status(201).json({ data: post });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await postService.updatePost(req.body, req.params);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await postService.deletePost(req.user, req.params);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.addComment(req.params, req.body, req.user);
    res.status(200).json({ data: post });
  } catch (err) {
    next(err);
  }
};

const fetchAllCommentsOnPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await postService.fetchAllCommentsOnPost(req.params);
    res.status(200).json({ data: comments });
  } catch (err) {
    next(err);
  }
};
