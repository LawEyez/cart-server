import { Document, Schema } from "mongoose";

export interface ICart extends Document {
  items: ICartItem[],
  user?: Schema.Types.ObjectId
}

export interface IBodyCart {
  items: ICartItem[],
  user?: Schema.Types.ObjectId
}

export interface ICartItem extends Document {
  product: string,
  qty: number,
  purchasePrice: number,
  totalPrice: number,
  status: string
}