import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { asyncHandler } from "../middlewares/asyncHandler";
import { AppError } from "../utils/AppError";
import { signinInput, signupInput } from "../types/common/validation";

export const signup = asyncHandler(async (req: Request, res: Response) => {
     const data = signupInput.parse(req.body);
     const existUser = await User.findOne({ email: data.email });
     if (existUser) throw new AppError("Email is already registerd", "BAD_REQUEST")
     const user = await User.create(data);
     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
     res.cookie(`${process.env.COOKIE_NAME!}`, token, {
          path: "/",
          expires: new Date(Date.now() + 1000*60*60*24),
          httpOnly: true,
          sameSite: "lax",
          signed: true,
     })
     res.status(201).json({ success: true, message: "Signup successfully" });
})

export const signin = asyncHandler(async (req: Request, res: Response) => {
     const data = signinInput.parse(req.body);
     const user = await User.findOne({ email: data.email });
     if (!user) throw new AppError("Invalid credentials", "BAD_REQUEST");
     const isMatch = await bcrypt.compare(data.password, user.password);
     if (!isMatch) throw new AppError("Invalid credentials", "BAD_REQUEST");
     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
     res.cookie(`${process.env.COOKIE_NAME!}`, token, {
          path: "/",
          expires: new Date(Date.now() + 1000*60*60*24),
          httpOnly: true,
          sameSite: "lax",
          signed: true,
     })
     res.status(200).json({ success: true, message: "Signin successfully" });
})

export const logout = async (req: Request, res: Response) => {
     res.clearCookie(`${process.env.COOKIE_NAME!}`).json({
          success: true,
          message: "Logged out successfully"
     })
}

export const profile = asyncHandler(async (req: Request, res: Response) => {
     const id = req.headers["userId"];
     const user = await User.findById(id).select("-password");
     if (!user) throw new AppError("User not found", "NOT_FOUND");
     res.status(200).json({ success: true, user });          
})
