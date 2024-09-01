import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


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