import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser, User } from "../models/users.model";

export interface RequestWithUserAndToken extends Request {
  user?: IUser;
  token?: string;
}

export const auth = async (
  req: RequestWithUserAndToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("authorization")?.replace("Bearer ", "") as string;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });

    if (!user) {
      return res.status(401).json({ error: "Please Authenticate!" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(err);
  }
};
