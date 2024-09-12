import express from "express";
import { getFilterdProducts, singleProduct } from "../../controllers/shop/product";

const router = express();

router.get("/filters", getFilterdProducts);
router.get("/:id", singleProduct);

export default router;