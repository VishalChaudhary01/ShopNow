import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import { asyncHandler } from "./asyncHandler";
import { AppError } from "../utils/AppError";

export const isAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${process.env.COOKIE_NAME!}`];
    if (!token) throw new AppError("Unauthorize User", "UNAUTHORIZED");
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) throw new AppError("Invalid token", "INSUFFICIENT_PERMISSIONS");
      const user = decoded as JwtPayload;
      if (user.id) {
        req.headers["userId"] = user.id;
        next();
      } else {
        throw new AppError("Invalid token payload", "INSUFFICIENT_PERMISSIONS");
      }
    });
  }
);

export const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.headers["userId"]);
    if (!user) throw new AppError("User not found", "NOT_FOUND");
    if (user.role === "admin") {
      next();
    }
    throw new AppError("Unauthroize user", "UNAUTHORIZED");  }
);
