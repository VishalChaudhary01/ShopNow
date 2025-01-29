import { Request, Response } from "express";
import Stripe from "stripe";
import { Order } from "../../models/Order";
import { Cart } from "../../models/Cart";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { addressInput } from "../../types/shop/validation";
import { ICartProduct, IOrderInfo } from "../../types/shop/type";
const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { products, _addressData }: IOrderInfo = req.body;
  const userId = req.headers["userId"];
  const addressData = addressInput.parse(_addressData);
  const lineItems = products.map((product: ICartProduct) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/shop/account",
      cancel_url: "http://localhost:5173/shop/cart",
    });
    await Cart.deleteMany({ userId });
    if (session.id) {
      await Order.create({
        userId,
        products,
        status: "On the way",
        addressData,
      });
      res.status(200).json({ id: session.id, success: true });
    }
  } catch (error) {
    console.error("Error during checkout: ", error);
    throw new Error("Error during checkout");
  }
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.headers["userId"];
  const orders = await Order.find({ userId }).populate({
    path: "products.productId",
    select: "image",
  });
  res.status(200).json({ success: true, orders });
});
