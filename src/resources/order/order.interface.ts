import { Document } from "mongoose";

import { ICartItem } from "@resources/cart/cart.interface";


interface IOrder extends Document {
  items: [ICartItem],
  itemTotal: number,
  shippingPrice: number,
  tax: number,
  total: number,
}

export default IOrder