import { Request, Response } from "express";
import { Product } from "../../models/Product";
import { Cart } from "../../models/Cart";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AppError } from "../../utils/AppError";
import { IPopulatedCart, ItemSchema } from "../../types/shop/type";

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.headers["userId"];
  const { productId, quantity }: ItemSchema = req.body;
  const product = await Product.findById(productId);
  if (!product) throw new AppError("Product not found", "NOT_FOUND");
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  const findCurrentProductIndex = cart.items.findIndex((item) => {
    return item.productId.toString() === productId.toString();
  });
  if (findCurrentProductIndex === -1) {
    cart.items.push({ productId, quantity });
  } else {
    cart.items[findCurrentProductIndex].quantity += quantity;
  }
  await cart.save();
  res.status(200).json({ success: true, cart });
});

export const fetchCartItems = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const cart = (await Cart.findOne({
      userId,
      "items.productId": { $exists: true },
    }).populate({
      path: "items.productId",
      select: "image title price salePrice totalStock",
    })) as unknown as IPopulatedCart;
    if (!cart) throw new AppError("Cart not found", "NOT_FOUND");
    res.status(200).json({
      success: true,
      products: cart.items,
    });
  }
);

export const updateCartItemQty = asyncHandler(async (req: Request, res: Response) => {
    const { productId, quantity }: ItemSchema = req.body;
    const userId = req.headers["userId"];
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", "NOT_FOUND");
    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (currentProductIndex === -1)
      throw new AppError("Cart item not present", "NOT_FOUND");
    cart.items[currentProductIndex].quantity += quantity;
    if (cart.items[currentProductIndex].quantity <= 0) {
      cart.items.splice(currentProductIndex, 1);
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  }
);
