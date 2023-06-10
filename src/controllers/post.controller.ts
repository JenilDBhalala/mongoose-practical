import { NextFunction, Request, Response } from "express";
import { RequestWithUserAndToken } from "../middlewares/auth";
import * as postService from "../services/post.service";
import { IUser } from "../models/users.model";

export const fetchAllPosts = async (
  req: RequestWithUserAndToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await postService.fetchAllPosts(req.user as IUser);
    res.status(200).json({ data: posts });
  } catch (err) {
    next(err);
  }
};

export const fetchPostById = async (
  req: RequestWithUserAndToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await postService.fetchPostById(req.user as IUser, req.params.id);
    res.status(200).json({ data: post });
  } catch (err) {
    next(err);
  }
};

export const addPost = async (req: RequestWithUserAndToken, res: Response, next: NextFunction) => {
  try {
    const post = await postService.addPost(req.body, req.user as IUser);
    res.status(201).json({ data: post });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await postService.updatePost(req.body, req.params.id);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req: RequestWithUserAndToken, res: Response, next: NextFunction) => {
  try {
    const message = await postService.deletePost(req.user as IUser, req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req: RequestWithUserAndToken, res: Response, next: NextFunction) => {
  try {
    const post = await postService.addComment(req.params.id, req.body, req.user as IUser);
    res.status(200).json({ data: post });
  } catch (err) {
    next(err);
  }
};

export const fetchAllCommentsOnPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await postService.fetchAllCommentsOnPost(req.params.id);
    res.status(200).json({ data: comments });
  } catch (err) {
    next(err);
  }
};
