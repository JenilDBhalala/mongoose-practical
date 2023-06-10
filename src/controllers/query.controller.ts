import { NextFunction, Request, Response } from "express";
import * as queryService from "../services/query.service";

//finding latest comments using aggregate pipeline with pagination, sorting and projection
export const findLatestComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await queryService.findLatestComments(
      req.params.id,
      req.query.skip as string,
      req.query.limit as string
    );
    res.status(200).json({ data: comments });
  } catch (err) {
    next(err);
  }
};

export const searchByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await queryService.searchByUsername(req.query.search as string);
    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};

//finding counts of post with specific tag
export const countOfPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await queryService.countOfPosts();
    res.status(200).json({ data: posts });
  } catch (err) {
    next(err);
  }
};
