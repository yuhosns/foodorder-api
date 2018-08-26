import mongoose from "mongoose"

mongoose.set("debug", true)
const SCHEMA = mongoose.Schema
const ordersSchema = new SCHEMA({
  _id:        String,
  totalToPay: { type: Number },
  orders:     [{ type: mongoose.Schema.ObjectId, ref: "Request" }],
  date:       Date,
})

ordersSchema.pre("save", function (next) {
  this.date = Date.now()
  next()
})

export default mongoose.model("orders", ordersSchema)



