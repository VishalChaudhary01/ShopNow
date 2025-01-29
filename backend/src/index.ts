import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db";
import { isAdmin, isAuth } from "./middlewares/auth";

import userRoutes from "./routes/user";
import shopProductRoutes from "./routes/shop/product";
import cartRoutes from "./routes/shop/cart";
import orderRoutes from "./routes/shop/order";

import adminProductRoutes from "./routes/admin/product";
import adminOrderRoutes from "./routes/admin/order";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT || 5000;

const app = express();
connectToDB();

app.use(cors({
     credentials: true,
     origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/user", userRoutes);
app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/cart", isAuth, cartRoutes);
app.use("/api/shop/order", isAuth, orderRoutes);
app.use("/api/admin/products", isAuth, isAdmin, adminProductRoutes);
app.use("/api/admin/order", isAuth, isAdmin, adminOrderRoutes);

app.get("/", (req: Request, res: Response) => {
     res.send("Healthy server!");
})

app.all("*", () => {
     throw new Error("API url not found");
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));