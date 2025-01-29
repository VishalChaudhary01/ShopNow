import { Response, Request } from "express";
import { Product } from "../../models/Product";
import { imageUploadUtil } from "../../middlewares/cloudinary";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { addProductData, updateProductData } from "../../types/admin/validation";
import { AppError } from "../../utils/AppError";

export const handleUpload = asyncHandler(async (req: Request, res: Response) => {
    const buffer = req.file?.buffer;
    if (buffer) {
      const b64 = Buffer.from(buffer).toString("base64");
      const url = "data:" + req.file?.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);
      res.json({
        success: true,
        result,
      });
    }
  }
);

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.headers["userId"];
  const data = addProductData.parse(req.body);
  await Product.create({
    ...data,
    user: userId,
  });
  res.status(201).json({
    success: true,
    message: "product added duccessfully",
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const id = req.params.id;
    const data = updateProductData.parse(req.body);
    const product = await Product.findById(id);
    if (!product) throw new AppError("Product not found", "NOT_FOUND");
    if (String(product.user) === userId) {
      await product.updateOne(data, { new: true });
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      throw new AppError("Unauthorize User", "UNAUTHORIZED");
    }
  }
);

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({ user: req.headers["userId"] });
    res.status(200).json({
      success: true,
      products,
    });
  }
);

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", "NOT_FOUND");
    if (String(product.user) === userId) {
      res.status(200).json({ success: true, product });
    } else {
      throw new AppError("Unauthorize User", "UNAUTHORIZED");
    }
  }
);

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers["userId"];
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", "NOT_FOUND");
    if (String(product.user) === userId) {
      await product.deleteOne();
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      throw new AppError("Unauthorize User", "UNAUTHORIZED");
    }
  }
);
