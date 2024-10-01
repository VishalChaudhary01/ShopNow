import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function fetchAllOrders(req: Request, res: Response) {
     try {
          const userId = req.headers["userId"];
          const orders = await Order.find({})
               .populate({
                    path: 'products.productId',
                    match: { user: userId },
                    select: 'image user'
               });
          return res.status(200).json({ success: true, orders });
     } catch (e: any) {
          console.error(e);
          res.status(400).json({ success: false, message: "Something went wrong" });
     }
}

interface Status {
     status: "On the way" | "Delivered" | "Cancel";
}
export async function updateStatus(req:Request, res: Response) {
     try {
          const userId = req.headers["userId"];
          const orderId = req.params.id;
          const status: Status = req.body;
          const order = await Order.findById(orderId)
               .populate({
                    path: "products.productId",
                    match: {user: userId},
                    select: "user",
               });
          if (!order) return res.status(404).json({ success: true, message: "Order not found" });
          await order.updateOne(status, { new: true });
          res.status(200).json({ success: true, message: "Order status updated" });        
     } catch (e: any) {
          console.error(e);
          res.status(400).json({ success: false, message: "Something went wrong" });
     }
}