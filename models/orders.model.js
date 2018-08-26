import mongoose from "mongoose"

mongoose.set("debug", true)
const SCHEMA = mongoose.Schema
const ordersSchema = new SCHEMA({
  _id:        String,
  totalToPay: { type: Number },
  orders:     [{ type: mongoose.Schema.ObjectId, ref: "Request" }],
})

export default mongoose.model("orders", ordersSchema)



