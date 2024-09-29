import { Request, Response } from "express";
import Stripe from "stripe";
import { Order } from "../../models/Order";
import { Address, addressInput } from "../../types/address";
import { Cart } from "../../models/Cart";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

interface ProductType {
     productId: string;
     name: string;
     price: number;
     quantity: number;
}
interface OrderInfo {
     products: ProductType[];
     addressInfo: Address;
}

export async function createOrder(req: Request, res: Response) {
     const { products, addressInfo }: OrderInfo  = req.body;     
     try {
          const userId = req.headers["userId"];
          const addressParse = addressInput.safeParse(addressInfo);
          if (addressParse.error) return res.status(411).json({ success: false, message: addressParse.error.issues[0].message || "Please enter valid address" });
          const lineItems = products.map((product: ProductType) => ({
               price_data: {
                    currency: "inr",
                    product_data: {
                         name: product.name
                    },
                    unit_amount: product.price * 100,
               },
               quantity: product.quantity
          }))
          const session = await stripe.checkout.sessions.create({
               payment_method_types: ["card"],
               line_items: lineItems,
               mode: "payment",
               success_url: "http://localhost:5173/shop/account",
               cancel_url: "http://localhost:5173/shop/cart"
          })
          await Cart.deleteMany({ userId });
          if (session.id) {
               await Order.create({
                    userId,
                    products,
                    status: "On the way",
                    addressInfo,
               })
               res.status(200).json({ id: session.id, success: true });
          }
     } catch (e: any) {
          console.error(e);
          res.status(400).json({ success: false, message: "Something went wrong" });
     }
}

export async function getOrders(req: Request, res: Response) {
     try {
          const userId = req.headers["userId"];
          const orders = await Order.find({ userId })
          .populate({
               path: 'products.productId',
               select: 'image'
          });
          return res.status(200).json({ success: true, orders });
     } catch (e: any) {
          console.error(e);
          res.status(400).json({ success: false, message: "Something went wrong" });
     }
}