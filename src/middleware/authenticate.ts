import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const secretKey: string = process.env.SECRET_KEY || "myseceretkey";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.url === "/api/v1/auth/login" ||
      req.url === "/api/v1/auth/register"
    ) {
      return next();
    }
    let token = req.headers.authorization;
    if (!token && token?.split(" ")[0] !== "Bearer") {
      return res.status(401).json({ message: "Please provide a valid token" });
    }
    jwt.verify(token?.split(" ")[1], secretKey, async (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ error: err, message: err.message });
      }
      if (user) {
        const user_info = await User.findOne({ username: user.username });
        // @ts-ignore
        req.user = user_info;
      }
      next();
    });
  } catch (error) {}
};
