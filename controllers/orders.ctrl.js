import Request from "../models/request.model"
import Orders from "../models/orders.model"
import getTodayDate from "../helpers/todaydate"

const TODAY_STRING = getTodayDate()
export default class OrdersController {
  /*
  |--------------------------------------------------------------------------
  | POST
  |--------------------------------------------------------------------------
  */
  static async onPost(req, res) {
    const { name, vendor, foodNumbers, totalAmount, status } = req.body

    let validateAmount = false
    if (totalAmount) {
      validateAmount = /^[0-9]*\.?[0-9]*$/.test(totalAmount)
    }

    if (validateAmount === false) {
      return res.status(400).json({ type: "totalAmount_number_only" })
    }

    // order to submit
    try {
      // personal request
      let request = new Request({
        name:        name,
        vendor:      vendor,
        foodNumbers: foodNumbers,
        totalAmount: totalAmount,
        status:      status,
        order_id:        TODAY_STRING,
      })
      request.save()

      Orders.collection.countDocuments({ _id: TODAY_STRING }, async function (err, count) {
        if (count > 0) {
          const response = await Orders.findByIdAndUpdate(TODAY_STRING,
            {
              "$push": { "orders": request },
              $inc:    { totalToPay: +request.totalAmount },
            },
          )

          console.log("今天已有订单，添加多一单")
          return res.json(response)
        } else {
          let orders = new Orders()
          orders._id = TODAY_STRING
          orders.totalToPay = request.totalAmount
          orders.orders.push(request)
          const response = await orders.save()
          console.log("今天还没有人下订单，添加新的订单")
          return res.json(response)
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        type: "database_failure",
      })
    }
  }

  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  */
  static async onGet(req, res) {
    try {
      const response = await Orders.find().sort('-date').populate("orders")
      return res.json(response)

    } catch (err) {
      console.log(err)
      return res.status(500).json({
        type: "database_failure",
      })
    }
  }

  /*
  |--------------------------------------------------------------------------
  | PATCH / UPDATE
  |--------------------------------------------------------------------------
  */
  static async onPatch(req, res) {
    const { id, foodNumbers } = req.body
    try {
      /*
      Orders.findById(TODAY_STRING, { "orderList.$": 1 }, function (err, response) {
        console.log(response)
        if (response) {
          const orderToEdit = response.orderList.find(order => {
            return order._id.toString() === id
          })

          console.log(orderToEdit._id)

          Orders.findById("ObjectId('5b7e24b68d62bb3a2cc33074')", function (err, tank) {
            console.log(tank)
          })

          Orders.findByIdAndUpdate(id,
            { $set: { foodNumbers: foodNumbers } },
            function (error, success) {
              if (error) {
                console.log(error)
              } else {
                console.log(success, " success")
              }
            },
          )
        }
      })
      */
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        type: "database_failure",
      })
    }
  }

}
