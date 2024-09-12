import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, handleUpload, updateProduct } from "../../controllers/admin/product";
import { upload } from "../../middlewares/cloudinary";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleUpload);
router.post("/new", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;