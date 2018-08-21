import SubmitOrder from "../models/submitorder.model"

let controller = {}

controller.addSubmitOrder = async (req, res, param) => {
  const order = param
  let orderModel = new SubmitOrder({
    orderList:  [],
    totalToPay: 0,
    submitted:  false,
  })

  orderModel.totalToPay = orderModel.totalToPay + order.totalAmount
  console.log(orderModel)

  try {
    if (orderModel.submitted === false) {
      await orderModel.update(
        { $addToSet: { "orderList": { order } } },
      )
    } else {
      await orderModel.save(
        { $addToSet: { "orderList": { order } } },
      )
    }
    return res.end()
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      type: "database_failure",
    })
  }

}

export default controller