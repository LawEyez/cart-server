import { Schema } from "mongoose";

interface Token extends Object {
  id: Schema.Types.ObjectId,
  email: string,
  firstName: string
}

export default Token