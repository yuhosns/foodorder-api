import mongoose from "mongoose"
import FoodOrder from "./foodorder.model"

const SCHEMA = mongoose.Schema
const SubmitOrderSchema = new SCHEMA({
  orderList:  [FoodOrder.schema],
  totalToPay: Number,
  submitted:  Boolean,
})

export default mongoose.model("SubmitOrder", SubmitOrderSchema)