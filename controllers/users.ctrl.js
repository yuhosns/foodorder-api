import User from "../models/user.model"
import Request from "../models/request.model"

export default class UsersController {
  /*
 |--------------------------------------------------------------------------
 | GET
 |--------------------------------------------------------------------------
 */
  static async onGet(req, res) {
    try {
      const response = await User.find({}, function (err, users) {
        let userMap = {}

        users.forEach(function (user) {
          userMap[user._id] = user
        })
      })

      return res.json(response)
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
    }
  }
}
