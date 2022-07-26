import { Schema, model } from 'mongoose'

import IProduct from '@resources/product/product.interface'


/** Product Schema */
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    qty: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
)


export default model<IProduct>('Product', ProductSchema)