import { Document } from "mongoose";


interface IProduct extends Document {
  name: string,
  price: number,
  slug?: string,
  image?: string,
  description: string,
  qty?: number
}

export default IProduct