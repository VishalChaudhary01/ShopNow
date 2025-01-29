import { Request, Response } from "express";
import { Order } from "../../models/Order";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AppError } from "../../utils/AppError";
import { IStatus } from "../../types/admin/type";

export const fetchAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const orders = await Order.find({}).populate({
      path: "products.productId",
      match: { user: userId },
      select: "image user",
    });
    res.status(200).json({ success: true, orders });
  }
);

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const orderId = req.params.id;
    const status: IStatus = req.body;
    const order = await Order.findById(orderId).populate({
      path: "products.productId",
      match: { user: userId },
      select: "user",
    });
    if (!order) throw new AppError("Order not found", "NOT_FOUND");
    await order.updateOne(status, { new: true });
    res.status(200).json({ success: true, message: "Order status updated" });
  }
);
