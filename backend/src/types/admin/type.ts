import { z } from "zod";
import { addProductData, updateProductData } from "./validation";

export type ProductType = z.infer<typeof addProductData>;
export type UpdateProductType = z.infer<typeof updateProductData>;

export interface IStatus {
     status: "On the way" | "Delivered" | "Cancel";
}