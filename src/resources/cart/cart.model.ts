import { Schema, model } from "mongoose";

import { ICart, ICartItem } from "@resources/cart/cart.interface";


/** Cart Item Schema */
export const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },

    qty: Number,

    purchasePrice: {
      type: Number,
      default: 0
    },

    totalPrice: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: 'Not Processed'
    }
  },
  { timestamps: true }
)

/** Cart Schema */
const CartSchema = new Schema(
  {
    items: [CartItemSchema],

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export const CartItem = model<ICartItem>('CartItem', CartItemSchema)
export const Cart = model<ICart>('Cart', CartSchema)