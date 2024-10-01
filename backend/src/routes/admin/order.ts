import express from "express";
import { fetchAllOrders, updateStatus } from "../../controllers/admin/order";
const router = express.Router();

router.get("/fetch-all-orders", fetchAllOrders);
router.put("/update-status/:id", updateStatus);

export default router;