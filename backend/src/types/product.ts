import { z } from "zod";

export const addProductData = z.object({
     title: z.string(),
     category: z.string(),
     brand: z.string(),
     price: z.number(),
     salePrice: z.number(),
     image: z.string(),
     totalStock: z.number().optional(),
     description: z.string(),
})


export const updateProductData = addProductData.partial();

export type UpdateProductType = z.infer<typeof updateProductData>;
export type ProductType = z.infer<typeof addProductData>;