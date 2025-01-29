import { z } from "zod";
import mongoose from "mongoose";
import { addressInput } from "./validation";

export type AddressType = z.infer<typeof addressInput>;

export interface IFilter {
  category?: string[];
  sortBy?: string;
}

export interface ICartProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrderInfo {
  products: ICartProduct[];
  _addressData: AddressType;
}

export interface ItemSchema {
  productId: mongoose.ObjectId;
  quantity: number;
}

export interface IPopulatedProduct {
  _id: string;
  image: string;
  title: string;
  price: number;
  salePrice: number;
}
export interface IPopulatedCartItem {
  productId: IPopulatedProduct;
  quantity: number;
}
export interface IPopulatedCart {
  items: IPopulatedCartItem[];
}
