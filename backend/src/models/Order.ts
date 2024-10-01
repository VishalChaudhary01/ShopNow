import mongoose, { ObjectId } from "mongoose";

interface Product {
     productId: ObjectId,
     name: string;
     price: number;
     quantity: number;
}
interface Address {
     street: string;
     city: string;
     state: string;
     pin: string;
}
interface OrderSchema {
     userId: ObjectId;
     products: Product[];
     addressInfo: Address[];
     status: "On the way" | "Delivered" | "Cancel";
}

const orderSchema = new mongoose.Schema<OrderSchema>(
     {
          userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
          products: [
               {
                    productId: { type: mongoose.Types.ObjectId, required: true, ref: "Product"},
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                    quantity: { type: Number, required: true },
               }
          ],
          addressInfo: {
               street: { type: String, required: true },
               city: { type: String, required: true },
               state: { type: String, required: true },
               pin: { type: String, required: true },
          },
          status: { type: String, required: true },
     },
     { timestamps: true}
);

export const Order =  mongoose.model<OrderSchema>("Order", orderSchema);