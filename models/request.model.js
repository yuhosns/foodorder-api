import mongoose from "mongoose"

const SCHEMA = mongoose.Schema
export const requestSchema = new SCHEMA({
  name:        { type: String, required: true },
  vendor:      String,
  foodNumbers: String,
  totalAmount: Number,
  status:      String,
  date:        String,
})

export default mongoose.model("Request", requestSchema)