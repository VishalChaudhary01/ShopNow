import { Request, Response } from "express";
import { Product } from "../../models/Product";
import { Cart, ItemSchema } from "../../models/Cart";

export async function addToCart(req: Request, res: Response) {
     try {
          const userId = req.headers["userId"];
          const { productId, quantity }: ItemSchema = req.body;
          const product = await Product.findById(productId);
          if (!product) return res.status(404).json({ success: false, message: "Product not found" });
          let cart = await Cart.findOne({ userId });
          if (!cart) {
               cart = new Cart({ userId, items: [] });
          }
          const findCurrentProductIndex = cart.items.findIndex((item) => {
               item.productId.toString() === productId.toString();
          });
          if (findCurrentProductIndex === -1) {
               cart.items.push({ productId, quantity });
          } else {
               cart.items[findCurrentProductIndex].quantity += quantity;
          }
          await cart.save();
          res.status(200).json({ success: true, cart });        
     } catch (e: any) {
          console.error(e);
          res.status(400).json({
               success: false,
               message: "Something went wrong"
          })
     }
}

interface PopulatedProduct {
     _id: string;
     image: string;
     title: string;
     price: number;
     salePrice: number;
}   
interface PopulatedCartItem {
     productId: PopulatedProduct;
     quantity: number;
}
interface PopulatedCart {
     items: PopulatedCartItem[];
}

export async function fetchCartItems(req: Request, res: Response) {
     try {
          const userId = req.headers["userId"];
          const cart = (await Cart.findOne({
               userId,
               "items.productId": { $exists: true }
          })
          .populate({
               path: "items.productId",
               select: "image title price salePrice totalStock",
          })) as unknown as PopulatedCart;

          if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
          res.status(200).json({
               success: true,
               products: cart.items
          })
     } catch (e: any) {
          res.status(400).json({ 
               success: false,
               message: e.message || "Something went wrong"
          })
     }
}

export async function updateCartItemQty(req: Request, res: Response) {
     try {
          const { productId, quantity }: ItemSchema = req.body;
          const userId = req.headers["userId"];
          const cart = await Cart.findOne({ userId });
          if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
          const currentProductIndex = cart.items.findIndex(
               (item) => item.productId.toString() === productId.toString()
          );
          if (currentProductIndex === -1) {
               return res.status(404).json({
                    success: false,
                    message: "Cart item not present",
               })
          }
          cart.items[currentProductIndex].quantity += quantity;
          if (cart.items[currentProductIndex].quantity <= 0) {
               cart.items.splice(currentProductIndex, 1);
          }
          await cart.save();
          res.status(200).json({
               success: true,
               message: "Cart updated successfully"
          });
     } catch (e: any) {
          res.status(400).json({ 
               success: false,
               message: e.message || "Something went wrong"
          })
     }
}

export async function deleteCartItem(req: Request, res: Response) {
     try {
          const userId = req.headers["userId"];
          const productId = req.params.id;
          const cart = await Cart.findOne({ userId });
          if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
          cart.items = cart.items.filter((item) => {
               item.productId.toString() !== productId
          })
          await cart.save();
          res.status(200).json({ 
               success: true,
               message: "Product deleted successfully"
          });
     } catch (e: any) {
          res.status(400).json({ 
               success: false,
               message: e.message || "Something went wrong"
          })
     }
}