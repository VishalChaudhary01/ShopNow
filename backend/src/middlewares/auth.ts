import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";


export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const token = req.signedCookies[`${process.env.COOKIE_NAME!}`];
          if (!token) return res.status(403).json({ success: false, message: "Unauthorize user"});
          jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
               if (err) {
                    return res.status(403).json({ success: false, message: "Invalid token" });
               }
               const user = decoded as JwtPayload;
               if (user.id) {
                    req.headers["userId"] = user.id;
                    return next();
               } else {
                    return res.status(403).json({ success: false, message: "Invalid token"})
               }
          })
     } catch (e: any) {
          res.status(403).json({ success: false, message: e.message})
     }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
     const user = await User.findById(req.headers["userId"]);
     if (!user) return res.status(400).json({ success: false, message: "Please Signin again"});
     if (user.role === "admin") {
          return next();
     }
     res.status(403).json({ success: false, message: "You are not an admin"});
}