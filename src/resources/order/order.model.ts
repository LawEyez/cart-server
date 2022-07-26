import { Schema, model } from 'mongoose'

import IOrder from '@resources/order/order.interface'

import { CartItemSchema } from '@resources/cart/cart.model'


/** Order schema definition */
const OrderSchema = new Schema(
  {
    items: [CartItemSchema],

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    itemTotal: {
      type: Number,
      default: 0
    },

    shippingPrice: {
      type: Number,
      default: 0
    },

    total: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'shipped', 'delivered', 'cancelled']
    }
  },
  { timestamps: true }
)

export default model<IOrder>('Order', OrderSchema)