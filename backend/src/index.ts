import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db";

import userRouter from "./routes/user";
import adminProductRouter from "./routes/product";
import { isAdmin, isAuth } from "./middlewares/auth";

dotenv.config();

const app = express();
connectToDB();

app.use(cors({
     credentials: true,
     origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/user", userRouter);
app.use("/api/admin/products", isAuth, isAdmin, adminProductRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));