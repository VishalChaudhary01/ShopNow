import { Request, Response } from "express";
import { Product } from "../../models/Product";

interface FilterType {
     category?: string[],
     sortBy?: string,
}

export async function getFilterdProducts(req: Request, res: Response) {
     try {
          const { category = [], sortBy = "price-lowtohigh" }: FilterType = req.query;
          const filters: Record<string, any> = {};

          if (category && category.length > 0) {
               filters.category = { $in: category }
          }
          if (category.length === 0) {
               delete filters.category;
          }
          const sort: Record<string, 1 | -1> = {};
          switch (sortBy) {
               case 'price-lowtohigh':
                    sort.price = 1;
                    break;
               case 'price-hightolow':
                    sort.price = -1;
                    break;
               case 'title-atoz':
                    sort.title = 1;
                    break;
               case 'title-ztoa':
                    sort.title = -1;
                    break;
               default:
                    sort.price = 1;
                    break;
          }
          const products = await Product.find(filters).sort(sort);
          res.status(200).json({ success: true, products });
     } catch (e: any) {
          console.error(e);
          res.status(400).json({ success: false, message: "Something went wrong" })
     }
}

export async function singleProduct(req:Request, res: Response) {
     try {
          const product = await Product.findById(req.params.id);
          return res.status(200).json({ success: true, product })
     } catch (e: any) {
          console.error(e);
          res.status(400).json({ 
               success: false,
               message: "Something went wrong, Please refresh the page"
          })
     }
}