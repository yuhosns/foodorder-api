import FoodOrder from "../models/foodorder.model"
import SubmitOrderCtrl from "../controllers/submitorder.ctrl"

let controller = {}

controller.addOrder = async (req, res) => {
  const { name, vendor, foodNumbers, totalAmount, status } = req.body
  let orderModel = new FoodOrder({
    name:        name,
    vendor:      vendor,
    foodNumbers: foodNumbers,
    totalAmount: totalAmount,
    status:      status,
  })

  try {
    const savedOrder = await orderModel.save()
    console.log(savedOrder)
    await SubmitOrderCtrl.addSubmitOrder(req, res, savedOrder)
  } catch (err) {
    console.log(err)
    res.send(err)
  }

}

export default controller