import express from "express";
import { addToCart, fetchCartItems, updateCartItemQty } from "../../controllers/shop/cart";

const router = express();

router.get("/", fetchCartItems);
router.post("/add", addToCart);
router.put("/update", updateCartItemQty);

export default router;