import mongoose from "mongoose"

mongoose.set("debug", true)
const SCHEMA = mongoose.Schema
const ordersSchema = new SCHEMA({
  _id:        String,
  totalToPay: { type: Number, get: getPrice, set: setPrice },
  orders:     [{ type: mongoose.Schema.ObjectId, ref: "Request" }],
})

function getPrice(num) {
  return (num / 100).toFixed(2)
}

function setPrice(num) {
  return num * 100
}

export default mongoose.model("orders", ordersSchema)



