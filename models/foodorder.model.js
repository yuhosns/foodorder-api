import mongoose from "mongoose"

const SCHEMA = mongoose.Schema
const FoodOrderSchema = new SCHEMA({
  name:        { type: String, required: true },
  vendor:      String,
  foodNumbers: String,
  totalAmount: Number,
  status:      String,
  date:        String,
})

FoodOrderSchema.pre("save", async function (next) {
  this.date = await getTodayDate()
  next()
})

FoodOrderSchema.methods.getOrder = function (date, cb) {

}

function getTodayDate() {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!
  let yyyy = today.getFullYear()

  if (dd < 10) {
    dd = "0" + dd
  }

  if (mm < 10) {
    mm = "0" + mm
  }
  return mm + dd + yyyy
}

export default mongoose.model("FoodOrder", FoodOrderSchema)