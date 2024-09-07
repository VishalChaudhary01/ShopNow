import mongoose from "mongoose";
import { User } from "./User";

export interface IProduct {
     user: mongoose.ObjectId,
     title: string;
     description: string;
     image: string;
     category: string;
     brand: string;
     price: number;
     salePrice: number;
     totalStock: number;
     avgReview: number;     
}

const productSchema = new mongoose.Schema<IProduct>(
     {
          user: {
               type: mongoose.Types.ObjectId,
               required: true,
               ref: User,
          },
          title: {
               type: String,
               required: true,
          },
          description: {
               type: String,
               required: true,
          },
          image: {
               type: String,
               required: true,
          },
          category: {
               type: String,
               required: true,
          },
          brand: {
               type: String,
               required: true,
          },
          price: {
               type: Number,
               default: 0,
               required: true,
          },
          salePrice: {
               type: Number,
               required: true,
          },
          totalStock: {
               type: Number,
               default: 0,
               required: true,
          },
          avgReview: {
               type: Number,
               default: 0,
          }
     },
     {
          timestamps: true
     }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);

