import Request from "../models/request.model"
import Orders from "../models/orders.model"
import getTodayDate from "../helpers/todaydate"

const TODAY_STRING = getTodayDate()
export default class RequestController {
  /*
 |--------------------------------------------------------------------------
 | GET
 |--------------------------------------------------------------------------
 */
  static async onGet(req, res) {
    const id = req.params.id
    try {
      const response = await Request.findById(id)
      return res.json(response)
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
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
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */
  static async onDelete(req, res) {
    const id = req.body.id || req.params.id
    const { orderID, totalAmount } = req.body
    try {

      await Promise.all([
        Request.findByIdAndRemove(id),
        Orders.findByIdAndUpdate(orderID,
          {
            $inc: { totalToPay: -totalAmount },
          },
        ),
      ])

      return res.end()
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
    }
  }

}
