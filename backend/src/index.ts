import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db";
import { isAdmin, isAuth } from "./middlewares/auth";

import userRoutes from "./routes/user";
import adminProductRoutes from "./routes/admin/product";
import shopProductRoutes from "./routes/shop/product";
import cartRoutes from "./routes/shop/cart";
import orderRoutes from "./routes/shop/order";

dotenv.config();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));