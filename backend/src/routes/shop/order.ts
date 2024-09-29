import express from "express";
import { createOrder, getOrders } from "../../controllers/shop/order";
const router = express.Router();

router.post("/create-order", createOrder);
router.get("/", getOrders);

export default router;