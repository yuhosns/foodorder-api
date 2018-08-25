import mongoose from "mongoose"

const SCHEMA = mongoose.Schema
export const requestSchema = new SCHEMA({
  name:        { type: String, required: true },
  vendor:      String,
  foodNumbers: String,
  totalAmount:  { type: Number, get: getPrice, set: setPrice },
  status:      String,
  date:        String,
})

function getPrice(num) {
  return (num / 100).toFixed(2)
}

function setPrice(num) {
  return num * 100
}

export default mongoose.model("Request", requestSchema)
