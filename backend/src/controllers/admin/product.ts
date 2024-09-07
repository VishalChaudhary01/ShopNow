import { Response, Request } from "express";
import { Product } from "../../models/Product";
import { addProductData, ProductType, UpdateProductType } from "../../types/product";
import { imageUploadUtil } from "../../middlewares/cloudinary";

export async function handleUpload(req: Request, res: Response) {
     try {
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
     } catch (e: any) {
          console.error("Error", e);
          res.json({
               success: false,
               message: e.message
          })
     }
}

export const addProduct = async (req: Request, res: Response) => {
     try {
          const userId = req.headers["userId"];
          const product: ProductType = req.body;
          const { success } = addProductData.safeParse(product);
          if (!success) return res.status(411).json({ success: false, message: "Invalid Input" });
          await Product.create({
               user: userId,
               image: product.image,
               title: product.title,
               description: product.description,
               category: product.category,
               brand: product.brand,
               price: product.price,
               salePrice: product.salePrice,
               totalStock: product.totalStock,
          });
          res.status(201).json({
               success: true,
               message: "product added duccessfully"
          });          
     } catch (e: any) {
          console.log(e);
          res.status(400).json({
               success: false,
               message: e.message
          });
     }
}

export const updateProduct = async (req: Request, res: Response) => {
     const userId = req.headers["userId"];
     const id = req.params.id;
     const formData: UpdateProductType = req.body;
     try {
          const product = await Product.findById(id);
          if (!product) return res.status(404).json({ success: false, message: "Product not found" });
          if (String(product.user) === userId) {
               await product.updateOne(formData, { new: true });
               res.status(200).json({ 
                    success: true,
                    message: "Product updated successfully"
               });
          }
     } catch (e: any) {
          console.log(e);
          res.status(400).json({
               success: false,
               message: e.message,
          });
     }
}

export const getAllProducts = async (req: Request, res: Response) => {
     try {
          const products = await Product.find({ user: req.headers["userId"] });
          res.status(200).json({
               success: true,
               products,
          });
     } catch (e: any) {
          console.error(e);
          res.status(400).json({
               success: false,
               message: "Error during fetch"
          })
     }
}

export const getProductById = async (req: Request, res: Response) => {
     const userId = req.headers["userId"];
     const productId = req.params.id;
     try {
          const product = await Product.findById(productId);
          if (!product) return res.status(404).json({ success: false, message: "Product not found" });
          if (String(product.user) === userId) {
               return res.status(200).json({ success: true, product });
          }
     } catch (e: any) {
          console.error(e);
          res.status(400).json({
               success: false,
               message: "Error during fetch"
          })
     }
}

export const deleteProduct = async (req: Request, res: Response) => {
     try {
          const userId = req.headers["userId"];
          const productId = req.params.id;
          const product = await Product.findById(productId);
          if (!product) return res.status(404).json({ success: false, message: "Product not found" });
          if (String(product.user) === userId) {
               await product.deleteOne();
               res.status(200).json({
                    success: true,
                    message: "Product deleted successfully"
               })
          }
     } catch (e: any) {
          console.error(e);
          res.status(400).json({
               success: false,
               message: "Error during delition"
          })
     }
}