import express from "express";
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQty } from "../../controllers/shop/cart";

const router = express();

router.get("/", fetchCartItems);
router.post("/add", addToCart);
router.put("/update", updateCartItemQty);
router.delete("/:id", deleteCartItem);

export default router;