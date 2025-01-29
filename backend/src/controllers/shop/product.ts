import { Request, Response } from "express";
import { Product } from "../../models/Product";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AppError } from "../../utils/AppError";
import { IFilter } from "../../types/shop/type";

export const getFilterdProducts = asyncHandler(async (req: Request, res: Response) => {
    const { category = [], sortBy = "price-lowtohigh" }: IFilter = req.query;
    const filters: Record<string, any> = {};

    if (category && category.length > 0) {
      filters.category = { $in: category };
    }
    if (category.length === 0) {
      delete filters.category;
    }
    const sort: Record<string, 1 | -1> = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }
    const products = await Product.find(filters).sort(sort);
    res.status(200).json({ success: true, products });
  }
);

export const singleProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError("Product not found", "NOT_FOUND");
    res.status(200).json({ success: true, product });
  }
);
