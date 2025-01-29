import mongoose from "mongoose";
import { ItemSchema } from "../types/shop/type";

export interface ICart {
     userId: mongoose.ObjectId;
     items: ItemSchema[]
}

const cartSchema = new mongoose.Schema<ICart>(
     {
          userId: {
               type: mongoose.Types.ObjectId,
               ref: "User",
               required: true,
          },
          items: [
               {
                    productId: {
                         type: mongoose.Types.ObjectId,
                         ref: "Product",
                         required: true,
                    },
                    quantity: {
                         type: Number,
                         required: true,
                         default: 1,
                         min: 1,
                    }
               }
          ]
     },
     { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", cartSchema);