import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "../models/User";
import { signinInput, SigninType, SignupInput, signupInput } from "../types/user";

export const signup = async (req: Request, res: Response) => {
     const { name, email, password }: SignupInput = req.body;
     try {
          signupInput.parse(req.body);
          const existUser = await User.findOne({ email: email });
          if (existUser) return res.status(411).json({ success: false, message: "Email is already registerd" });
          const user = await User.create({ 
               name,
               email,
               password,
          })
          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
          res.cookie(`${process.env.COOKIE_NAME!}`, token, {
               path: '/',
               expires: new Date(Date.now() + 1000*60*60*24),
               httpOnly: true,
               sameSite: 'lax',
               signed: true,
          })
          res.status(201).json({ success: true, message: "Signup successfully" });
     } catch (e: any) {
          res.status(411);
          if (e instanceof z.ZodError) {
               res.json({ success: false, message: e.issues})
          }
          res.json({ success: false, message: e.message });
     }
}

export const signin = async (req: Request, res: Response) => {
     const { email, password }: SigninType = req.body;
     try {
          signinInput.parse(req.body);
          const user = await User.findOne({ email: email });
          if (!user) return res.status(404).json({ success: false, message: "Invalid credentials" });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(411).json({ success: false, message: "Invalid credentials" });
          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
          res.cookie(`${process.env.COOKIE_NAME!}`, token, {
               path: '/',
               expires: new Date(Date.now() + 1000*60*60*24),
               httpOnly: true,
               sameSite: 'lax',
               signed: true,
          })
          res.status(200).json({ success: true, message: "Signin successfully" });
     } catch (e: any) {
          res.status(411);
          if (e instanceof z.ZodError) {
               res.json({ success: false, message: e.issues})
          }
          res.json({ success: false, message: e.message });
     }
}

export const logout = async (req: Request, res: Response) => {
     res.clearCookie(`${process.env.COOKIE_NAME!}`).json({
          success: true,
          message: "Logged out successfully"
     })
}

export const profile = async (req: Request, res: Response) => {
     const id = req.headers["userId"];
     try {
          const user = await User.findById(id, '-password')
          res.status(200).json({ success: true, user });          
     } catch (e: any) {
          res.status(400).json({ success: false, message: e.message});
     }
}
